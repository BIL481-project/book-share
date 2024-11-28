import {TextInput} from "react-native-paper";
import React from "react";


const CustomTextInput = (props) => {
    return (
        <TextInput
            style={{backgroundColor:"transparent"}}
            outlineColor="white"
            activeOutlineColor="white"
            selectionColor="white"
            cursorColor="white"
            underlineColor="white"
            activeUnderlineColor="white"
            textColor="white"
            placeholderTextColor="white"
            {...props}
        />


    )

}

export default CustomTextInput;