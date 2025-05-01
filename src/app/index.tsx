import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import UserRepository from "../database/UserRepository";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/useAuthStore";

const userRepository = new UserRepository();

const LoginScreen = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha o email e a senha.");
      return;
    }

    try {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        Alert.alert("Erro", "Usuário não encontrado.");
        return;
      }

      if (user.password !== password) {
        Alert.alert("Erro", "Senha incorreta.");
        return;
      }

      // Se o usuário for encontrado e a senha estiver correta, armazene o usuário na store
      setUser(user);

      Alert.alert("Sucesso", "Login realizado com sucesso!");
      router.replace("/home");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Logotipo_journal.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="|   Digite seu email"
            placeholderTextColor="#afb7e5"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={[styles.label, { marginTop: 20 }]}>Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="|   Digite sua senha"
            placeholderTextColor="#afb7e5"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#afb7e5"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <Link href="/cadastro" asChild>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>CADASTRE-SE</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: "90%",
    marginBottom: 60,
  },
  label: {
    color: "#afb7e5",
    fontSize: 12,
    marginBottom: 5,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#afb7e5",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: "#82C0D1",
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#82C0D1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#B49EFE",
    opacity: 0.8,
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#B49EFE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  registerButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;
