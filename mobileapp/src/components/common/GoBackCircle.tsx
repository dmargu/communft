import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { colors, scaledSize } from '../../constants';

const GoBackCircle = () => {
    const navigation = useNavigation();
    return (
        <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
        })}>
          <View style={styles.container}>
            <Entypo
                    name="chevron-left"
                    size={scaledSize(20)}
                    color={colors.neutralEight}
                />
          </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: scaledSize(35),
        width: scaledSize(35),
        borderRadius: scaledSize(35/2),
        backgroundColor: colors.neutralThree,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default GoBackCircle;