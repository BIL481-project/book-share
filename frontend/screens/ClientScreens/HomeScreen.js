import { Modal, PaperProvider, Portal, Searchbar} from "react-native-paper";
import React, {useEffect} from "react";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import {useState} from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import CustomBookDetails from "../../components/CustomBookDetails";
import CustomBookComponent from "../../components/CustomBookComponent";

function HomeScreen(){

    const [bookData, setBookData] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const showModal = (index) => setVisible(index);
    const hideModal = () => setVisible(false);



    const [searchQuery,setSearchQuery] = useState('');

    const containerStyle = {backgroundColor: 'white', padding: 20};

    useEffect(() => {


        authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
            setBookData(response.data);
        }).catch((err)=> {
            console.log(err);
        })


    }, []);




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

                   <CustomBookComponent item={item} index={index}/>

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