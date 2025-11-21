import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import alunoService, { Aluno } from "../../scripts/alunoService";
import FormAluno from "../../components/FormAluno";

const palette = {
  background: "#F7F5FF",
  highlight: "#E4DEFF",
  text: "#1F1B2F",
  muted: "#6B6784",
};

export default function NovoAluno() {
  const [aluno, setAluno] = useState<Aluno>({
    nome: "",
    turma: "",
    curso: "",
    matricula: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name: keyof Aluno, value: string) => {
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (data?: any) => {
    const nome = data?.nome ?? aluno.nome;
    const turma = data?.turma ?? aluno.turma;
    const curso = data?.curso ?? aluno.curso;
    const matricula = data?.matricula ?? aluno.matricula;

    if (!nome || !turma || !curso || !matricula) {
      alert("Preencha todos os campos!");
      return;
    }
    setLoading(true);
    try {
      await alunoService.criar({ nome, turma, curso, matricula });
      if (router.canGoBack?.()) {
        router.back();
      } else {
        router.replace("/alunos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.backgroundAccent} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Novo Aluno
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Complete os campos para cadastrar um aluno.
            </Text>
          </View>
          <FormAluno
            aluno={aluno}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => {
              if (router.canGoBack?.()) {
                router.back();
              } else {
                router.replace("/alunos");
              }
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: palette.background },
  backgroundAccent: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: palette.highlight,
    bottom: -60,
    right: -40,
    opacity: 0.6,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  title: {
    color: palette.text,
    fontWeight: "700",
  },
  subtitle: {
    color: palette.muted,
  },
});
