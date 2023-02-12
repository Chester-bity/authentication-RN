import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Paragraph from '../components/Paragraph'

export default function ResetPasswordScreen({ navigation }) {

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Paragraph>
        This page is not working, please wait for next update or instruction. Thank you for your patience.
      </Paragraph>
    </Background>
  )
}
