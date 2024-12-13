import {Image, TouchableOpacity, View} from "react-native";
import { Text} from "react-native-paper";
import React from "react";


function CustomBookDetails({item}){


    return(<>


            <View  style={{borderRadius:30,borderColor:"white",backgroundColor:"red", width:"100%",paddingVertical:15,margin:"2%"}}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Text style={{flex:1,fontSize:24,textAlign:"center",color:"white"}}>{item?.id}</Text>
                    <Text style={{flex:3,fontSize:22,textAlign:"center",color:"white"}}>{item?.name}</Text>
                    <TouchableOpacity onPress={()=>console.log("Merhaba Dünya")} style={{flex:1, alignItems:"center"}}>


                        {/*<Menu*/}
                        {/*    visible={visibleMenu}*/}
                        {/*    onDismiss={closeMenu}*/}
                        {/*    anchor={<Button onPress={openMenu} style={{fontSize:20,color:"white"}}>Menü</Button>}>*/}
                        {/*    <Menu.Item onPress={() => {handleBorrowFunction()}} title="Borrow" />*/}
                        {/*    <Menu.Item onPress={() => {handleReturnFunction()}} title="Return" />*/}
                        {/*    <Menu.Item onPress={showModal} title="Ayrıntılar" />*/}
                        {/*</Menu>*/}


                    </TouchableOpacity>
                </View>

                <View style={{padding:5}}>

                    <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item?.isAvailable ? "Available": "Not available" }</Text>
                    <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item?.genre}</Text>
                    <Text style={{fontSize:20,textAlign:"center",color:"white"}}>{item?.location}</Text>
                    <Text style={{fontSize:14,color:"white",padding:5, textAlign:"center"}}>{item?.description}</Text>
                </View>

                <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
                    <Image source={{uri:`${item.image}`}} style={{width:150,height:200,margin:20,resizeMode:"cover"}}/>
                </View>
            </View>




    </>)



}


export default CustomBookDetails;