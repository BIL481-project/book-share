import {Button,  Menu, Modal, PaperProvider, Portal, Searchbar, Text} from "react-native-paper";
import React, {useEffect} from "react";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import {useState} from "react";
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import CustomBookDetails from "../../components/CustomBookDetails";

function HomeScreen(){

    const [bookData, setBookData] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const showModal = (index) => setVisible(index);
    const hideModal = () => setVisible(false);

    const [visibleMenu, setVisibleMenu] = React.useState(false);
    const openMenu = (index) => setVisibleMenu(index);
    const closeMenu = () => setVisibleMenu(false);

    const [searchQuery,setSearchQuery] = useState('');

    const containerStyle = {backgroundColor: 'white', padding: 20};

    useEffect(() => {

        console.log("Use Effect Çalıştı");

        authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
            console.log(response.data[0]);
            setBookData(response.data);
        }).catch((err)=> {
            console.log(err);
        })


    }, []);


    async function handleBorrowFunction(bookId){

        console.log(BACKEND_URL+'/books/lend/'+bookId);

        authApi.post(BACKEND_URL+'/books/lend/'+bookId).then((res)=> {
            console.log(res);
            //const data = res;
        }).catch((err)=> {
            console.log(err);
        })
    }

    async function handleReturnFunction(bookId){
        console.log(BACKEND_URL+'/books/lend/'+ bookId);


        authApi.post(BACKEND_URL+'/books/return/'+bookId).then((res)=> {
            console.log(res);
           // const data = res;
        }).catch((err)=> {
            console.log(err);
        })
    }

    function searchMethod(){

        console.log("Merhaba", searchQuery);


    }


    return(<>

        <Searchbar style={{margin:"5%"}}
                   placeholder="Search anything"
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                   onSubmitEditing={()=> {searchMethod()}} />



      <PaperProvider>
        <ScrollView>
        <View style={{borderRadius:20,alignItems:"center"}}>

            {bookData.map((item,index,_)=> (

                <TouchableOpacity onPress={() => showModal(index)} key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"90%",paddingVertical:15,margin:"2%"}}>

                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>{index+1}</Text>
                        <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>{item.name}</Text>
                        <TouchableOpacity onPress={()=>console.log("Merhaba Dünya")} style={{flex:1, alignItems:"center"}}>
                            <Menu
                                visible={visibleMenu === index}
                                onDismiss={closeMenu}
                                anchor={<Button onPress={() => {openMenu(index); console.log(index)}} style={{fontSize:20,color:"white"}}>Menü</Button>}>
                                {item.borrowerId === null && item.isAvailable === 1 ? (<Menu.Item onPress={() => {handleBorrowFunction(item.id)}} title="Borrow" />): null}
                                {item.borrowerId === 37 ? (<Menu.Item onPress={() => {handleReturnFunction(item.id)}} title="Return" />):null}
                                <Menu.Item onPress={() => showModal(index)} title="Details" />
                            </Menu>
                        </TouchableOpacity>
                    </View>

                    <View style={{padding:5}}>
                        <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.genre}</Text>
                        <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item.location}</Text>
                    </View>

                    <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
                        <Image source={{uri:`${item.image}`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
                    </View>

                    <Portal>
                        <Modal  visible={visible === index} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <CustomBookDetails item={item}/>
                        </Modal>
                    </Portal>

                </TouchableOpacity>



        ))}




        </View>
        </ScrollView>
      </PaperProvider>

    </>)


}


export default HomeScreen;