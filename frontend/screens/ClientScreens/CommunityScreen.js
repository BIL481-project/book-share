import {Icon, Modal, Button, PaperProvider, Portal, Text, Menu} from "react-native-paper";
import {Image,  TouchableOpacity, View} from "react-native";
import React from "react";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';

function CommunityScreen(){
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);


    const [visibleMenu, setVisibleMenu] = React.useState(false);

    const openMenu = () => setVisibleMenu(true);

    const closeMenu = () => setVisibleMenu(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};


    async function handleBorrowFunction(){

        console.log(BACKEND_URL+'/book/lend/'+'14');


        authApi.get(BACKEND_URL+'/books/lend/14').then((res)=> {
            console.log(res);
            //const data = res;



        }).catch((err)=> {
            console.log(err);
        })

    }



    return(<>

            <PaperProvider>
                <Portal>
                    <Modal  visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View  style={{borderRadius:30,borderColor:"white",backgroundColor:"blue", width:"90%",paddingVertical:15,margin:"2%"}}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>1</Text>
                            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>Kitap</Text>
                            <TouchableOpacity onPress={()=>console.log("Merhaba Dünya")} style={{flex:1, alignItems:"center"}}>


                                <Menu
                                    visible={visibleMenu}
                                    onDismiss={closeMenu}
                                    anchor={<Button onPress={openMenu} style={{fontSize:20,color:"white"}}>Menü</Button>}>
                                    <Menu.Item onPress={() => {handleBorrowFunction()}} title="Borrow" />
                                </Menu>


                            </TouchableOpacity>
                        </View>

                        <View style={{padding:5}}>
                            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>Korku</Text>
                            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>Ankara</Text>
                            <Text style={{fontSize:14,color:"white",padding:5, textAlign:"center"}}>A classic novel by J.D. Salinger about teenage alienation.</Text>
                        </View>

                        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
                            <Image source={{uri:`https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
                        </View>
                        </View>
                    </Modal>
                </Portal>




            <TouchableOpacity onPress={showModal}  style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"90%",paddingVertical:15,margin:"2%"}}>

        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>1</Text>
            <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>Kitap</Text>
            <View style={{flex:1, alignItems:"center"}}>
                <Icon size={20} style={{flex:1}} source={require("../../../assets/cham (1).png")}/>
            </View>
        </View>

        <View style={{padding:5}}>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>Korku</Text>
            <Text style={{fontSize:20,textAlign:"center",color:"white"}}>Ankara</Text>
        </View>

        <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri:`https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
        </View>

    </TouchableOpacity>

            </PaperProvider>


    </>





    )

}


export default CommunityScreen;