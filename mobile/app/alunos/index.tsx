import React, { useCallback, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StyleSheet,
  Platform,
} from "react-native";
import {
  Card,
  Button,
  Text,
  FAB,
  Avatar,
  Chip,
  IconButton,
  Searchbar,
} from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useRouter } from "expo-router";
import alunoService, { Aluno } from "../../scripts/alunoService";

const palette = {
  background: "#F7F5FF",
  card: "#FFFFFF",
  primary: "#6C63FF",
  secondary: "#A78BFA",
  accent: "#FF6584",
  text: "#1F1B2F",
  muted: "#6B6784",
  highlight: "#E4DEFF",
  chip: "#EFE9FF",
};

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const carregarAlunos = useCallback(async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setErrorMessage(null);
    try {
      const lista = await alunoService.listar();
      setAlunos(lista);
    } catch (error) {
      console.error("Erro ao carregar alunos", error);
      setAlunos([]);
      setErrorMessage(
        "Nao foi possivel carregar os alunos. Verifique sua conexao e tente novamente."
      );
      Alert.alert(
        "Erro",
        "Nao foi possivel carregar os alunos. Verifique sua conexao e tente novamente."
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      } else {
        setRefreshing(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarAlunos();
    }, [carregarAlunos])
  );

  const filteredAlunos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return alunos;
    return alunos.filter((aluno) =>
      `${aluno.nome} ${aluno.turma} ${aluno.curso} ${aluno.matricula}`
        .toLowerCase()
        .includes(term)
    );
  }, [alunos, search]);

  const hasSearch = search.trim().length > 0;

  const handleDelete = (id: number) => {
    const executarExclusao = async () => {
      try {
        await alunoService.excluir(id);
        setAlunos((listaAtual) => listaAtual.filter((aluno) => aluno.id !== id));
        await carregarAlunos(false);
      } catch (error) {
        console.error("Erro ao excluir aluno", error);
        Alert.alert("Erro", "Nao foi possivel excluir o aluno. Tente novamente.");
      }
    };

    if (Platform.OS === "web") {
      const confirmou =
        typeof globalThis !== "undefined" &&
        (globalThis as any).confirm?.("Deseja realmente excluir este aluno?");
      if (confirmou) {
        executarExclusao();
      }
      return;
    }

    Alert.alert("Excluir Aluno", "Deseja realmente excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: executarExclusao,
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={palette.primary} />
        <Text style={styles.loadingText}>Carregando alunos...</Text>
      </SafeAreaView>
    );
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Alunos</Text>
      <Text style={styles.headerSubtitle}>
        Consulte turmas, cursos e matrículas rapidamente.
      </Text>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryValue}>{alunos.length}</Text>
          <Text style={styles.summaryLabel}>itens cadastrados</Text>
        </View>
        <IconButton
          icon="refresh"
          size={20}
          onPress={() => carregarAlunos(false)}
        />
      </View>
      <Searchbar
        placeholder="Buscar por nome, turma, curso ou matricula"
        value={search}
        onChangeText={setSearch}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
        iconColor={palette.primary}
        placeholderTextColor={palette.muted}
        elevation={0}
      />
      <Button
        mode="outlined"
        icon="refresh"
        onPress={() => carregarAlunos(false)}
        loading={refreshing}
        style={styles.refreshButton}
        textColor={palette.text}
      >
        Atualizar lista
      </Button>
    </View>
  );

  const renderItem = ({ item }: { item: Aluno }) => (
    <Card style={styles.productCard} mode="elevated">
      <Card.Title
        title={item.nome}
        titleStyle={styles.productTitle}
        left={(props) => (
          <Avatar.Icon
            {...props}
            size={44}
            icon="account-school-outline"
            style={styles.productAvatar}
            color={palette.primary}
          />
        )}
      />
      <Card.Content style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.infoLabel}>Matricula</Text>
            <Text style={styles.infoValue}>{item.matricula || "--"}</Text>
          </View>
          <Chip
            icon="identifier"
            compact
            style={styles.idChip}
            textStyle={styles.idChipText}
          >
            #{item.id ?? "N/I"}
          </Chip>
        </View>
        <View style={styles.chipRow}>
          <Chip
            icon="book-open-variant"
            compact
            style={styles.courseChip}
            textStyle={styles.courseChipText}
          >
            {item.curso || "Sem curso"}
          </Chip>
          <Chip
            icon="account-group-outline"
            compact
            style={styles.turmaChip}
            textStyle={styles.turmaChipText}
          >
            {item.turma || "Sem turma"}
          </Chip>
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="contained-tonal"
          onPress={() => router.push(`/alunos/${item.id}`)}
          icon="pencil-outline"
          style={styles.editButton}
          textColor={palette.primary}
        >
          Editar
        </Button>
        <Button
          mode="outlined"
          textColor={palette.accent}
          onPress={() => handleDelete(item.id!)}
          icon="trash-can-outline"
        >
          Excluir
        </Button>
      </Card.Actions>
    </Card>
  );

  const renderEmpty = () => {
    if (hasSearch && !errorMessage && alunos.length > 0) {
      return (
        <Card style={styles.emptyCard} mode="elevated">
          <Card.Content style={styles.emptyContent}>
            <Avatar.Icon
              size={48}
              icon="magnify"
              style={styles.emptyIcon}
              color={palette.primary}
            />
            <Text style={styles.emptyTitle}>Nada encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Ajuste os termos de busca para localizar o aluno desejado.
            </Text>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Card style={styles.emptyCard} mode="elevated">
        <Card.Content style={styles.emptyContent}>
          <Avatar.Icon
            size={48}
            icon={errorMessage ? "alert-circle-outline" : "clipboard-list-outline"}
            style={styles.emptyIcon}
            color={palette.primary}
          />
          <Text style={styles.emptyTitle}>
            {errorMessage ? "Erro ao carregar" : "Nenhum aluno ainda"}
          </Text>
          <Text style={styles.emptySubtitle}>
            {errorMessage ??
              "Comece cadastrando um aluno para ver tudo organizado aqui."}
          </Text>
          <Button
            mode="contained"
            onPress={() =>
              errorMessage ? carregarAlunos(false) : router.push("/alunos/novo")
            }
            style={styles.emptyButton}
            icon={errorMessage ? "refresh" : "plus"}
          >
            {errorMessage ? "Tentar novamente" : "Adicionar aluno"}
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.backgroundAccent} />
      <FlatList
        data={filteredAlunos}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => carregarAlunos(false)}
            colors={[palette.primary]}
            tintColor={palette.primary}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          filteredAlunos.length === 0 && styles.listContentEmpty,
        ]}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty()}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/alunos/novo")}
        color="#fff"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  backgroundAccent: {
    position: "absolute",
    height: 260,
    width: 260,
    borderRadius: 130,
    backgroundColor: palette.highlight,
    top: -40,
    left: -60,
    opacity: 0.6,
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
    gap: 16,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    gap: 10,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: palette.text,
  },
  headerSubtitle: {
    fontSize: 15,
    color: palette.muted,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 18,
    backgroundColor: palette.card,
    shadowColor: palette.primary,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: "700",
    color: palette.primary,
    lineHeight: 36,
  },
  summaryLabel: {
    fontSize: 14,
    color: palette.muted,
  },
  searchbar: {
    borderRadius: 16,
    backgroundColor: palette.card,
  },
  searchbarInput: {
    color: palette.text,
  },
  refreshButton: {
    alignSelf: "flex-start",
    borderRadius: 12,
    borderColor: palette.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background,
    gap: 12,
    padding: 24,
  },
  loadingText: {
    color: palette.muted,
    fontSize: 16,
  },
  productCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: palette.card,
    borderWidth: 1,
    borderColor: "rgba(108, 99, 255, 0.08)",
  },
  productAvatar: {
    backgroundColor: palette.chip,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.text,
  },
  cardContent: {
    gap: 12,
    paddingTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 12,
    color: palette.muted,
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 22,
    fontWeight: "700",
    color: palette.primary,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  idChip: {
    backgroundColor: palette.chip,
    borderRadius: 14,
  },
  idChipText: {
    color: palette.text,
    fontWeight: "700",
  },
  courseChip: {
    backgroundColor: "rgba(108, 99, 255, 0.12)",
  },
  courseChipText: {
    color: palette.primary,
    fontWeight: "600",
  },
  turmaChip: {
    backgroundColor: "rgba(255, 101, 132, 0.1)",
    borderColor: "rgba(255, 101, 132, 0.4)",
    borderWidth: 1,
  },
  turmaChipText: {
    color: palette.accent,
    fontWeight: "600",
  },
  cardActions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  editButton: {
    marginRight: 8,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: palette.primary,
    borderRadius: 32,
  },
  emptyCard: {
    borderRadius: 20,
    backgroundColor: palette.card,
  },
  emptyContent: {
    alignItems: "center",
    gap: 8,
  },
  emptyIcon: {
    backgroundColor: palette.chip,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: palette.text,
    textAlign: "center",
  },
  emptySubtitle: {
    textAlign: "center",
    color: palette.muted,
    fontSize: 15,
    marginBottom: 4,
  },
  emptyButton: {
    borderRadius: 12,
    backgroundColor: palette.primary,
    marginTop: 4,
  },
  columnWrapper: {
    gap: 12,
  },
});
