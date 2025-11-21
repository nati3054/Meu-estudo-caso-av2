import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import alunoService, { Aluno } from "../../scripts/alunoService";
import FormAluno from "../../components/FormAluno";

const palette = {
  background: "#F7F5FF",
  highlight: "#E4DEFF",
  text: "#1F1B2F",
  muted: "#6B6784",
  primary: "#6C63FF",
};

export default function EditarAluno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [aluno, setAluno] = useState<Aluno>({
    nome: "",
    turma: "",
    curso: "",
    matricula: "",
  });
  const [loadingAluno, setLoadingAluno] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoadingAluno(true);
      alunoService
        .obter(Number(id))
        .then((data) => {
          setAluno({
            nome: data.nome,
            turma: data.turma,
            curso: data.curso,
            matricula: data.matricula,
          });
        })
        .finally(() => setLoadingAluno(false));
    }
  }, [id]);

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
    setSaving(true);
    try {
      await alunoService.atualizar(Number(id), {
        nome,
        turma,
        curso,
        matricula,
      });
      if (router.canGoBack?.()) {
        router.back();
      } else {
        router.replace("/alunos");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loadingAluno) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={palette.primary} />
        <Text style={styles.loadingText}>Carregando aluno...</Text>
      </SafeAreaView>
    );
  }

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
              Editar Aluno
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Atualize as informacoes e salve para sincronizar com o sistema.
            </Text>
          </View>
          <FormAluno
            aluno={aluno}
            loading={saving}
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
  backgroundAccent: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: palette.highlight,
    top: -60,
    right: -40,
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background,
    gap: 12,
  },
  loadingText: {
    color: palette.muted,
    fontSize: 16,
  },
});
