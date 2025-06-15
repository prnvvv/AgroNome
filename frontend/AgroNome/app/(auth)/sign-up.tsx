import { useSignUp, useOAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const router = useRouter()

  const [firstName, setFirstName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)

  const onSignUpPress = async () => {
    if (!isLoaded) return
    setLoading(true)

    try {
      const signUpAttempt = await signUp.create({
        firstName,
        emailAddress,
        password,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/(tabs)/Dashboard')
      } else {
        Alert.alert('Success', 'Please check your email to verify your account.')
      }
    } catch (err : any) {
      Alert.alert('Error', err.message ||'Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onGoogleSignUp = async () => {
    setGoogleLoading(true)
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()
      
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId })
        router.replace('/(tabs)/Dashboard')
      }
    } catch (err : any) {
      Alert.alert('Error', err.message || 'Google sign up failed. Please try again.')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/splash-icon.png')} style={styles.logoIcon} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Sign up</Text>

      {/* Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          autoCapitalize="words"
          value={firstName}
          placeholder=""
          onChangeText={setFirstName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
          value={emailAddress}
          placeholder=""
          onChangeText={setEmailAddress}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={password}
          placeholder=""
          secureTextEntry={true}
          onChangeText={setPassword}
          autoComplete="password"
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[styles.signUpButton, loading && styles.disabledButton]} 
        onPress={onSignUpPress}
        disabled={loading || !firstName || !emailAddress || !password}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.signUpButtonText}>Sign up</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Sign Up */}
      <TouchableOpacity 
        style={[styles.googleButton, googleLoading && styles.disabledButton]} 
        onPress={onGoogleSignUp}
        disabled={googleLoading}
      >
        {googleLoading ? (
          <ActivityIndicator color="#374151" />
        ) : (
          <>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Sign In Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Link href="/(auth)/sign-in">
          <Text style={styles.signInText}>Sign in</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logoIcon: {
    width: 200,
    height: 200,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lexend-SemiBold', // Updated font family
    color: '#1F2937',
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lexend-Regular', // Added font family
    color: '#1F2937',
  },
  signUpButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Lexend-SemiBold', // Updated font family
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: 'Lexend-Medium', // Added font family
    color: '#6B7280',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  googleButtonText: {
    color: '#374151',
    fontSize: 16,
    fontFamily: 'Lexend-Medium', // Added font family
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Lexend-Regular', // Added font family
    color: '#6B7280',
  },
  signInText: {
    fontSize: 15,
    fontFamily: 'Lexend-SemiBold', // Added font family
    color: '#10B981',
  },
})
