import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { LoginScreen } from '../screens/Auth/LoginScreen';
import { SignupScreen } from '../screens/Auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/Auth/ForgotPasswordScreen';
import { ResetPasswordScreen } from '../screens/Auth/ResetPasswordScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { RequestFormScreen } from '../screens/Requests/RequestFormScreen';
import { MyRequestsScreen } from '../screens/Requests/MyRequestsScreen';
import { AdminLoginScreen } from '../screens/Admin/AdminLoginScreen';
import { AdminHomeScreen } from '../screens/Admin/AdminHomeScreen';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  AdminLogin: undefined;
};

export type UserStackParamList = {
  Home: undefined;
  RequestForm: undefined;
  MyRequests: undefined;
};

export type AdminStackParamList = {
  AdminHome: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();
const AdminStack = createNativeStackNavigator<AdminStackParamList>();

function LoadingState() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Giriş Yap' }}
      />
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ title: 'Kayıt Ol' }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Parolamı Unuttum' }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: 'Yeni Parola' }}
      />
      <AuthStack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{ title: 'Admin Girişi' }}
      />
    </AuthStack.Navigator>
  );
}

function UserStackNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Antika Deposu' }}
      />
      <UserStack.Screen
        name="RequestForm"
        component={RequestFormScreen}
        options={{ title: 'Parça Talebi' }}
      />
      <UserStack.Screen
        name="MyRequests"
        component={MyRequestsScreen}
        options={{ title: 'Taleplerim' }}
      />
    </UserStack.Navigator>
  );
}

function AdminStackNavigator() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{ title: 'Tüm Talepler' }}
      />
    </AdminStack.Navigator>
  );
}

export function AppNavigator() {
  const { user, isInitializing } = useAuth();

  const isAdmin = useMemo(() => user?.role === 'admin', [user?.role]);

  if (isInitializing) {
    return <LoadingState />;
  }

  return (
    <NavigationContainer>
      {user ? (
        isAdmin ? (
          <AdminStackNavigator />
        ) : (
          <UserStackNavigator />
        )
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type UserScreenProps<T extends keyof UserStackParamList> =
  NativeStackScreenProps<UserStackParamList, T>;

export type AdminScreenProps<T extends keyof AdminStackParamList> =
  NativeStackScreenProps<AdminStackParamList, T>;

