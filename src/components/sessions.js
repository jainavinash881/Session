import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  AppState,
  AsyncStorage
} from 'react-native';

const Sessions = () => {

    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [sessionValue, setSessionValue] = useState(false);
    

    useEffect(() => {
            let localStorageValue = AsyncStorage.setItem("sessionValue",JSON.stringify(sessionValue))
            const subscription = AppState.addEventListener("change", nextAppState => {
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            if(appState.current === 'background'){
                setTimeout(async () => {
                    setSessionValue(false);
                    let storeage = await AsyncStorage.setItem("sessionValue",'false');
                    
                  }, 3600000);
            }else{
                console.log("app is in foreground now")
            }
          });
      
          return () => {
            subscription && subscription.remove();
          };
    },[]);

    const toggleSwitch = async() => {
        await setSessionValue(!sessionValue);
        await AsyncStorage.setItem("sessionValue",JSON.stringify(!sessionValue));
    }
    return(
        <View style={styles.paddingView}>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={sessionValue ? "#81b0ff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={sessionValue}
            />
            <Text>Current Session : {sessionValue === true ? 'True' : 'False'}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    paddingView:{
        paddingStart: 30,
        paddingTop: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Sessions;