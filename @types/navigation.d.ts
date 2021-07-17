export {};

declare global {
  export type RootStackType = {
    AuthStack: AuthStackType;
    OnboardingScreen: undefined;
    MainTab: MainTabType;
  };

  export type AuthStackType = {
    SignInScreen: undefined;
    SignUpScreen: undefined;
  };

  export type MainTabType = {
    HomeStack: HomeStackType;
    ResultStack: ResultStackType;
    SettingStack: undefined;
  };

  export type HomeStackType = {
    HomeScreen: undefined;
  };

  export type ResultStackType = {
    ResultScreen: undefined;
    WriteScreen: undefined;
  };

  export type SettingStackType = {
    SettingScreen: undefined;
  };
}
