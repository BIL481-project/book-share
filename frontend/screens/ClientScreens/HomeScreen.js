import { Modal, PaperProvider, Portal, Searchbar,ToggleButton} from "react-native-paper";
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

    const [toggleValue, setToggleValue] = React.useState('left');

    const [searchQuery,setSearchQuery] = useState('');

    const containerStyle = {backgroundColor: 'white', padding: 20};

    useEffect(() => {


        authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
            setBookData(response.data);
        }).catch((err)=> {
            console.log(err);
        })


    }, []);




    async function searchMethod(){
        console.log("Merhaba", searchQuery);

        try {

            if (toggleValue === "left") { //user request
                const response = await authApi.get(`${BACKEND_URL}/search`, {option: "book", input: searchQuery});
                console.log(response, "Response");
            } else { //book request


            }

        } catch(err){
            console.error("Error: "+ err);
        }

    }


    return(<>
   <View style={{flexDirection: "row", alignItems: "center", padding: "5%"}}>
        <Searchbar style={{flex: 4, marginRight: 10}}
                   placeholder="Search anything"
                   value={searchQuery}
                   onChangeText={setSearchQuery}
                   onSubmitEditing={()=> {searchMethod()}} />

        <ToggleButton.Row style={{borderRadius: 5,flex:1}} onValueChange={value => setToggleValue(value)} value={toggleValue}>
            <ToggleButton icon="account" value="left" rippleColor="green"  backgroundColor={toggleValue === 'left' ? "green" : "white"}/>
            <ToggleButton icon="book" value="right" ippleColor="green"  backgroundColor={toggleValue === 'right' ? "green" : "white"}/>
        </ToggleButton.Row>
    </View>
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