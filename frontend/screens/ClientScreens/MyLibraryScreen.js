import {StyleSheet, View, ScrollView, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Portal, Modal, PaperProvider} from "react-native-paper";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomBookComponent from "../../components/CustomBookComponent";
import CustomBookDetails from "../../components/CustomBookDetails";
import { getSessionUserId } from "../../utils/getSessionUserId";



function MyLibraryScreen(){

    const [bookData, setBookData] = useState([]);
    const [userId, setUserId] = useState(-1);
    const [visible, setVisible] = React.useState(false);
    const showModal = (index) => setVisible(index);
    const hideModal = () => setVisible(false);

    useEffect(() => {

        async function loadBooks(){

            const sessionUserId = await getSessionUserId();
            setUserId(sessionUserId); // Oturum açan kullanıcının ID'sini alıyoruz

            console.log('aaaaaaaa: ' + userId);

            await authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
                console.log(response.data[0]);
                setBookData(response.data);




            }).catch((err)=> {
                console.log(err);
            })

        }

        loadBooks();


    }, []);


    return(<>

        <PaperProvider>
            <ScrollView>
                <View style={{borderRadius:20,alignItems:"center"}}>

                    {bookData.map((item,index,_)=> {

                        if(item.borrowerId===userId || item.ownerId===userId)
                            return (

                        <TouchableOpacity onPress={() => showModal(index)} key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"90%",paddingVertical:15,margin:"2%"}}>

                            <CustomBookComponent item={item} index={index} userId={userId}/>

                            <Portal>
                                <Modal
                                    visible={visible === index}
                                    onDismiss={hideModal}
                                    contentContainerStyle={landingStylesheet.containerStyle}
                                >
                                    <CustomBookDetails item={item} />
                                </Modal>
                            </Portal>

                        </TouchableOpacity>

                    )}
                    )}
                </View>
            </ScrollView>
        </PaperProvider>
    </>)


}


const landingStylesheet = StyleSheet.create({

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        width:"120%",
    },containerStyle:{
        backgroundColor: 'white',
        padding: 20
    }
});



export default MyLibraryScreen;