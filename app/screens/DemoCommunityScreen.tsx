import React, { FC, useEffect, useContext, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "../components"
import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { spacing } from "../theme"
import { openLinkInBrowser } from "../utils/openLinkInBrowser"
import { isRTL } from "../i18n"

const chainReactLogo = require("../../assets/images/cr-logo.png")
const reactNativeLiveLogo = require("../../assets/images/rnl-logo.png")
const reactNativeRadioLogo = require("../../assets/images/rnr-logo.png")
const reactNativeNewsletterLogo = require("../../assets/images/rnn-logo.png")

import { MyContext } from "../app"

export const DemoCommunityScreen: FC<DemoTabScreenProps<"DemoCommunity">> =
  function DemoCommunityScreen(_props) {
    const [d, setD] = useState('0');
    let temp;
    const a = useContext(MyContext);
    // console.log(a.value)
    useEffect(() => {
      const timedFetch = setInterval(() => {
        fetch(`http://192.168.116.41:8000/predict`, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: a.value
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Prediction:', data);
          // console.log(a.value);
          temp = d;
          setD(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }, 3000);
      return () => clearInterval(timedFetch);
    }, [])
    return (
      <Screen preset="scroll" contentContainerStyle={$container} safeAreaEdges={["top"]}>
        <Text preset="heading" style={$title}>Know the hurry!</Text>
        {d=='1' ? 
          (
            <ListItem
              leftIcon="ladybug"
              rightIcon={"view"}
            >Slower than usual</ListItem>
          )
          :
          (
            <ListItem
              leftIcon="clap"
              rightIcon={"view"}
            >Faster than usual</ListItem>
          )
        }
        {temp=='1' ? 
          (
            <ListItem
              leftIcon="ladybug"
              rightIcon={"check"}
            >Slower than usual</ListItem>
          )
          :
          (
            <ListItem
              leftIcon="clap"
              rightIcon={"check"}
            >Faster than usual</ListItem>
          )
        }
      </Screen>
    )
  }

const $container: ViewStyle = {
  paddingTop: spacing.large + spacing.extraLarge,
  paddingHorizontal: spacing.large,
}

const $title: TextStyle = {
  marginBottom: spacing.small,
}

const $tagline: TextStyle = {
  marginBottom: spacing.huge,
}

const $description: TextStyle = {
  marginBottom: spacing.large,
}

const $sectionTitle: TextStyle = {
  marginTop: spacing.huge,
}

const $logoContainer: ViewStyle = {
  marginEnd: spacing.medium,
  flexDirection: "row",
  flexWrap: "wrap",
  alignContent: "center",
}

const $logo: ImageStyle = {
  height: 38,
  width: 38,
}

// @demo remove-file
