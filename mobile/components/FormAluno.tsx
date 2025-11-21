import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button, HelperText, Surface } from "react-native-paper";
import { Aluno } from "../scripts/alunoService";

interface FormValues {
  nome: string;
  turma: string;
  curso: string;
  matricula: string;
}

interface Props {
  aluno: Aluno;
  loading: boolean;
  onChange: (name: keyof Aluno, value: string) => void;
  onSubmit: (data?: FormValues) => void;
  onCancel: () => void;
}

const palette = {
  primary: "#6C63FF",
  text: "#1F1B2F",
  outline: "#DCD5FF",
  surface: "#FFFFFF",
};

export default function FormAluno({
  aluno,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      nome: aluno.nome,
      turma: aluno.turma,
      curso: aluno.curso,
      matricula: aluno.matricula,
    },
  });

  useEffect(() => {
    setValue("nome", aluno.nome);
    setValue("turma", aluno.turma);
    setValue("curso", aluno.curso);
    setValue("matricula", aluno.matricula);
  }, [aluno, setValue]);

  return (
    <Surface style={styles.surface} elevation={2}>
      <Controller
        control={control}
        name="nome"
        rules={{ required: "Nome obrigatorio" }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <View style={styles.field}>
            <TextInput
              label="Nome"
              value={value}
              onChangeText={(text) => {
                onChangeField(text);
                onChange("nome", text);
              }}
              mode="outlined"
              style={styles.input}
              autoFocus
              textColor={palette.text}
              selectionColor={palette.primary}
              outlineColor={palette.outline}
              activeOutlineColor={palette.primary}
              error={!!fieldState.error}
            />
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        control={control}
        name="turma"
        rules={{
          required: "Turma obrigatoria",
        }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <View style={styles.field}>
            <TextInput
              label="Turma"
              value={value}
              onChangeText={(text) => {
                onChangeField(text);
                onChange("turma", text);
              }}
              mode="outlined"
              style={styles.input}
              selectionColor={palette.primary}
              outlineColor={palette.outline}
              activeOutlineColor={palette.primary}
              textColor={palette.text}
              error={!!fieldState.error}
            />
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        control={control}
        name="curso"
        rules={{
          required: "Curso obrigatorio",
        }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <View style={styles.field}>
            <TextInput
              label="Curso"
              value={value}
              onChangeText={(text) => {
                onChangeField(text);
                onChange("curso", text);
              }}
              mode="outlined"
              style={styles.input}
              selectionColor={palette.primary}
              outlineColor={palette.outline}
              activeOutlineColor={palette.primary}
              textColor={palette.text}
              error={!!fieldState.error}
            />
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <Controller
        control={control}
        name="matricula"
        rules={{
          required: "Matricula obrigatoria",
        }}
        render={({ field: { onChange: onChangeField, value }, fieldState }) => (
          <View style={styles.field}>
            <TextInput
              label="Matricula"
              value={value}
              onChangeText={(text) => {
                onChangeField(text);
                onChange("matricula", text);
              }}
              mode="outlined"
              style={styles.input}
              selectionColor={palette.primary}
              outlineColor={palette.outline}
              activeOutlineColor={palette.primary}
              textColor={palette.text}
              error={!!fieldState.error}
            />
            <HelperText type="error" visible={!!fieldState.error}>
              {fieldState.error?.message}
            </HelperText>
          </View>
        )}
      />
      <View style={styles.buttonGroup}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          style={styles.primaryButton}
          labelStyle={styles.primaryButtonLabel}
          contentStyle={{ paddingVertical: 4 }}
          icon="content-save-outline"
        >
          Salvar
        </Button>
        <Button
          mode="text"
          onPress={onCancel}
          textColor={palette.primary}
          icon="arrow-left"
        >
          Cancelar
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: palette.surface,
    gap: 12,
  },
  field: {
    width: "100%",
  },
  input: {
    backgroundColor: palette.surface,
  },
  buttonGroup: {
    gap: 4,
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: palette.primary,
  },
  primaryButtonLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});
