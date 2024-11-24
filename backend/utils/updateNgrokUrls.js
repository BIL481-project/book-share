const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Ngrok'u başlatan fonksiyon
const launchNgrok = () => {
  console.log('Ngrok başlatılıyor...');
  return new Promise((resolve, reject) => {
    const process = exec('ngrok start --all --log=stdout', (error, stdout, stderr) => {
      if (error) {
        reject(`Ngrok başlatılamadı: ${error.message}`);
        return;
      }
    });

    resolve(process); // Başarılı bir şekilde süreç başlatıldı
  });
};

// Ngrok API'nin hazır olmasını bekleyen fonksiyon
const waitForNgrokApi = async (maxRetries = 10, interval = 1000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axios.get('http://127.0.0.1:4040/api/tunnels');
      if (response.status === 200 && response.data.tunnels.length > 0) {
        return response.data.tunnels; // Tüneller hazırsa döndür
      }
    } catch (error) {
      // API henüz hazır değil
    }

    await new Promise((resolve) => setTimeout(resolve, interval)); // Bekleme süresi
    retries++;
  }

  throw new Error('Ngrok API belirtilen süre içinde hazır olmadı.');
};

// .env dosyasını güncelleyen fonksiyon
const updateEnvFile = (tunnels) => {
  const envFilePath = path.resolve(process.cwd(), '.env');
  const envData = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf8') : '';
  const envLines = envData.split('\n').filter(Boolean); // Boş satırları filtrele

  const updatedEnvLines = [...envLines]; // Mevcut .env verisi
  const keysToUpdate = {};

  tunnels.forEach((tunnel) => {
    const key = tunnel.name.toUpperCase().replace(/-/g, '_') + '_URL'; // Örn: "api-server" => "API_SERVER_URL"
    const value = tunnel.public_url;

    keysToUpdate[key] = value;

    const existingIndex = updatedEnvLines.findIndex((line) => line.startsWith(`${key}=`));
    if (existingIndex !== -1) {
      // Key mevcutsa, yeni değerle güncelle
      updatedEnvLines[existingIndex] = `${key}=${value}`;
    } else {
      // Key mevcut değilse, yeni satır olarak ekle
      updatedEnvLines.push(`${key}=${value}`);
    }
  });

  // .env dosyasını güncelle
  fs.writeFileSync(envFilePath, updatedEnvLines.join('\n'));
  console.log('Tünel bilgileri .env dosyasına yazıldı:', keysToUpdate);
};

// Ana fonksiyon
const startNgrok = async () => {
  try {
    // Ngrok'u başlat
    launchNgrok();

    // Tünellerin hazır olmasını bekle
    console.log('Ngrok API hazır olması bekleniyor...');
    const tunnels = await waitForNgrokApi();

    // Tünel bilgilerini .env dosyasına yaz
    updateEnvFile(tunnels);

    console.log('Ngrok işlemi tamamlandı.');
  } catch (error) {
    console.error('Ngrok çalıştırılırken bir hata oluştu:', error.message);
  }
};

// Export edilen ana fonksiyon
module.exports = startNgrok;