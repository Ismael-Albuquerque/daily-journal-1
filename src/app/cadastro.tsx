import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import UserRepository from "../database/UserRepository";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/useAuthStore";


const CadastroScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  const router = useRouter();
  const userRepository = new UserRepository();
  const setUser = useAuthStore((state) => state.setUser);


  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);


  const handleRegister = async () => {
    if (!nome.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }


    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }


    try {
      const existingUser = await userRepository.findByEmail(email.trim());
      if (existingUser) {
        Alert.alert("Erro", "Email já cadastrado.");
        return;
      }


      const userId = await userRepository.create({
        nome: nome.trim(),
        email: email.trim(),
        password,
      });


      const newUser = {
        id: userId,
        nome: nome.trim(),
        email: email.trim(),
        password,
      };


      setUser(newUser);


      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      router.replace("/"); // Redireciona para a tela inicial (index)
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao cadastrar usuário.");
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/Logotipo_journal.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>


      <Text style={styles.title}>VAMOS PERSONALIZAR SUA EXPERIÊNCIA!</Text>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome completo</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ex: João da Silva"
            placeholderTextColor="#b0b0d0"
            value={nome}
            onChangeText={setNome}
          />
        </View>


        <Text style={[styles.label, { marginTop: 10 }]}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Ex: joao@email.com"
            placeholderTextColor="#b0b0d0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>


        <Text style={[styles.label, { marginTop: 10 }]}>Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#b0b0d0"
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
              color="#b0b0d0"
            />
          </TouchableOpacity>
        </View>


        <Text style={[styles.label, { marginTop: 10 }]}>Confirmar Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#b0b0d0"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? "eye" : "eye-off"}
              size={24}
              color="#b0b0d0"
            />
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity style={styles.createButton} onPress={handleRegister}>
        <Text style={styles.createButtonText}>CRIAR</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.cancelButton} onPress={() => router.push("/")}>
        <Text style={styles.cancelButtonText}>CANCELAR</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 13,
    color: "#7a7acb",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 0,
  },
  label: {
    color: "#b0b0d0",
    fontSize: 12,
    marginBottom: 5,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#b0b0d0",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 35,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  createButton: {
    backgroundColor: "#88c9d6",
    width: 200,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#88c9d6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  createButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelButton: {
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
  cancelButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});


export default CadastroScreen;





