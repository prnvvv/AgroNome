import { useSignIn, useOAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [googleLoading, setGoogleLoading] = React.useState(false)

  const onSignInPress = async () => {
    if (!isLoaded) return
    setLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)/Dashboard')
      } else {
        Alert.alert('Error', 'Sign in failed. Please try again.')
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()
      
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId })
        router.replace('/(tabs)/Dashboard')
      }
    } catch (err : any) {
      Alert.alert('Error', err.message ||'Google sign-in failed. Please try again.')
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
      <Text style={styles.title}>Sign in</Text>

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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.disabledButton]} 
        onPress={onSignInPress}
        disabled={loading || !emailAddress || !password}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>Sign in</Text>
        )}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity 
        style={[styles.googleButton, googleLoading && styles.disabledButton]} 
        onPress={onGoogleSignIn}
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

      {/* Sign Up Link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>New Around Here? </Text>
        <Link href="/(auth)/sign-up">
          <Text style={styles.signUpText}>SignUp</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Lexend-Medium', // Added font family
    color: '#6B7280',
  },
  loginButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#059669',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
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
    marginTop: 24,
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Lexend-Regular', // Added font family
    color: '#6B7280',
  },
  signUpText: {
    fontSize: 15,
    fontFamily: 'Lexend-SemiBold', // Added font family
    color: '#10B981',
  },
})