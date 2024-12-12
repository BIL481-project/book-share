import {StyleSheet, View, ScrollView, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {Portal, Modal, PaperProvider} from "react-native-paper";
import authApi from "../../axios_instances/authApi";
import CustomBookComponent from "../../components/CustomBookComponent";
import CustomBookDetails from "../../components/CustomBookDetails";



function UserLibrary({navigation,route}){

    const [borrowedBookData, setBorrowedBookData] = useState([]);
    const [ownedBookData, setOwnedBookData] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const showModal = (index) => setVisible(index);
    const hideModal = () => setVisible(false);

    const { userNames } = route.params;

    useEffect(() => {

        console.log(userNames, "Merhaba User Library");
        console.log(route.params);

        async function loadBooks(){

            try {

                const response = await authApi.get('/profiles/'+userNames);
                console.log(response.data);
                setBorrowedBookData(response.data.borrowedBooks)
                console.log(response.data.borrowedBooks);
                setOwnedBookData(response.data.ownedBooks)
                console.log(borrowedBookData.length)

            } catch (err){
                console.error(err);
            }

        }

        loadBooks();


    }, []);


    return(<>

        <PaperProvider>
            <ScrollView>
                <View style={{borderRadius:20,alignItems:"center"}}>

                    {([ ...ownedBookData,...borrowedBookData]).map((item,index,_)=> {
                            return (

                                <TouchableOpacity onPress={() => showModal(index)} key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"90%",paddingVertical:15,margin:"2%"}}>

                                    <CustomBookComponent item={item} index={index}/>

                                    <Portal>
                                        <Modal  visible={visible === index} onDismiss={hideModal} contentContainerStyle={landingStylesheet.containerStyle}>
                                            <CustomBookDetails item={item}/>
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



export default UserLibrary;