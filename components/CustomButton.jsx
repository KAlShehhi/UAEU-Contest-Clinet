
import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyle, textStyles, isLoading, isPrimaryAction}) => {
    return (
      <>
        {
          isPrimaryAction ? 
            <TouchableOpacity 
              onPress={handlePress}
              activeOpacity={0.7}
              className={`
              bg-primary border-primary-300 border-2  rounded-xl min-h-[62px] justify-center items-center mt-7 ${containerStyle} ${isLoading ? 'opacity-50' : ''} `}
            > 
              <Text className={`text-textColor font-lBold text-lg ${textStyles}`}>{title}</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity 
              onPress={handlePress}
              activeOpacity={0.7}
              className={`
              bg-secondary  rounded-xl min-h-[62px] justify-center items-center mt-7 ${containerStyle} ${isLoading ? 'opacity-50' : ''} `}
            > 
              <Text className={`text-primary font-lBold text-lg ${textStyles}`}>{title}</Text>
            </TouchableOpacity>
        }
      </>
      )
}

export default CustomButton

