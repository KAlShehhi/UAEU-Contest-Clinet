import { Text, View, TouchableOpacity} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'

function CustomBigButton({ icon, text, handlePress, disabled }) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`border-secondary/100 border-2 bg-secondary/30 rounded-lg py-5 px-3 my-2 ${disabled ? 'opacity-50' : ''}`}
        disabled={disabled}
      >
        <View className="flex-row items-center">
          <View className="border-secondary/100 border-2 rounded-full p-3 m-2">
            <FontAwesomeIcon icon={icon} style={{ color: "#99C35F", padding: 25 }} />
          </View>
          <View className="flex-1 pl-4 justify-center">
            <Text className="text-secondary font-lBold text-lg">{text}</Text>
          </View>
          <View className="justify-center">
            <FontAwesomeIcon icon={faChevronRight} style={{ color: "#99C35F", padding: 15 }} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

export default CustomBigButton