import {Avatar,  Modal, PaperProvider, Portal, Searchbar, Text, ToggleButton} from "react-native-paper";
import React, {useEffect} from "react";
import authApi from "../../axios_instances/authApi";
import { BACKEND_URL } from '@env';
import {useState} from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import CustomBookDetails from "../../components/CustomBookDetails";
import CustomBookComponent from "../../components/CustomBookComponent";

function HomeScreen({navigation}){

    const [bookData, setBookData] = useState([]);
    const [userData,setUserData] = useState([]);
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


    useEffect(() => {

        if(searchQuery === ''){
            authApi.get(`${BACKEND_URL}/books/`).then((response)=> {
                setBookData(response.data);
                setUserData([]);
            }).catch((err)=> {
                console.log(err);
            })
        }


    }, [searchQuery]);



    async function searchMethod(){
        console.log("Merhaba", searchQuery);

        try {

            if (toggleValue === "left") { //user request

                    const response = await authApi.get(`${BACKEND_URL}/search`, {
                        params: { option: "user", input: searchQuery },
                    });
                    setUserData(response.data);
                    setBookData([]);

                    console.log("Response Data:", response.data); // Sunucudan dönen veri


            } else { //book request
                const response = await authApi.get(`${BACKEND_URL}/search`, {
                    params: { option: "book", input: searchQuery },
                });
                setUserData([]);
                setBookData(response.data);

                console.log("Response Data:", response.data); // Sunucudan dönen veri

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


            {userData.map((item,index,_)=> (

                <TouchableOpacity onPress={() => navigation.navigate("ViewProfileScreen", { userNames: item?.userName })} key={index} style={{borderRadius:30,borderColor:"white",backgroundColor:"green", width:"90%",paddingVertical:15,margin:"2%"}}>

                    <View style={{flexDirection:"row", padding:10}}>
                        <Avatar.Image size={50} source={require('./../../common/images/profilPic.png')}/>

                        <View style={{ justifyContent:"space-around"}}>

                            <View style={{flexDirection:"row", justifyContent:"space-between",paddingHorizontal:15}}>
                                <Text style={{justifyContent:"center",textAlign:"left"}}>{item?.userName}</Text>


                            </View>

                            <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:15}}>
                                <Text>{item?.email}</Text >
                            </View>

                        </View>
                    </View>

                </TouchableOpacity>


            ))}




        </View>
        </ScrollView>
      </PaperProvider>

    </>)


}


export default HomeScreen;