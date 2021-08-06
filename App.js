import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, Vibration } from "react-native";


const Page = styled.View`
  flex: 1;
  background-color: #232324;
  align-items: center;
  justify-content: center;
`

const HeaderText = styled.Text`
  font-size: 25px;
  color: #ebebeb;
  font-weight: bold;
`
const InputText = styled.TextInput`
  width: 90%;
  background-color:#595959;
  color: #ebebeb;
  border-radius: 10px;
  margin-top: 10px;
  font-size: 20px;
  padding: 10px;
`

const TranslateButton = styled.TouchableOpacity`
  width: 90%;
  background-color: #121212;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
  margin-top: 20px;
  border-radius: 25px;
`

const TranslateButtonText = styled.Text`
  color: #ebebeb;
  font-size: 20px;
  font-weight: bold;
`

const ResultArea = styled.TextInput`
  width: 90%;
  background-color:#595959;
  color: #ebebeb;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 20px;
  padding: 10px;
`
const ResultAreaText = styled.Text`
  color: white;
  font-size: 20px;
`

const CopyTextButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin-left: 20px;
  width: 20%;
  background-color: #121212;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 50px;
  margin-top: 20px;
  border-radius: 17px;
`

const CopyTextButtonText = styled.Text`
  color: #ebebeb;
  font-size: 20px;
  font-weight: bold;
`




function App() {
  const [text, setText] = useState("");
  const [viewResultArea, setViewResultArea] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Texto...");
  const [placeholderTextColor, setPlaceholderTextColor] = useState("#d4d4d4");
  const [textTranslate, setTextTranslate] = useState("");
  const handleChangeText = (text) => {
    setText(text);
  }

  function translateText() {
    fetch(`https://just-translated.p.rapidapi.com/?lang=en&text=${text}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "a0197aae19mshefc42969c22ad2ap1a4fd1jsn8f668c3fe3d3",
        "x-rapidapi-host": "just-translated.p.rapidapi.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then((data) => {
        setTextTranslate(data.text);
        setViewResultArea(true);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleButtonClick() {
    if (text == '') {
      setPlaceholderText("Insira o texto que deseja traduzir!");
      setPlaceholderTextColor("yellow");
      Vibration.vibrate(10 * 1000);
    } else {
      translateText();
    }
  }


  return (
    <Page>
      <HeaderText>TRANSLATE</HeaderText>
      <InputText
        value={text}
        onChangeText={handleChangeText}
        multiline={true}
        numberOfLines={0}
        placeholder={placeholderText}
        placeholderTextColor={placeholderTextColor}

      />
      <TranslateButton onPress={handleButtonClick}>
        <TranslateButtonText>Traduzir</TranslateButtonText>
      </TranslateButton>



      {
        viewResultArea == true &&
        <>
          <ResultArea
            editable={false}
            multiline={true}
            numberOfLines={0}
          >

            <ResultAreaText>{textTranslate}</ResultAreaText>

          </ResultArea>
          <CopyTextButton>
            <CopyTextButtonText>Copiar</CopyTextButtonText>
          </CopyTextButton>
        </>

      }

    </Page>
  );
};

export default App;