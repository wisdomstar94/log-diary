import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HeaderTextButton } from "@/components/header-text-button";
import { ScreenContainer } from "@/components/screen-container";
import { ThemedText } from "@/components/themed-text";
import { FONT_FAMILY } from "@/constants/font-family";
import { useSearchEntries } from "@/hooks/use-search-entries";
import { useTheme } from "@/hooks/use-theme";

import { SearchResultItem } from "./_components/search-result-item";

export function SearchScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const searchEntries = useSearchEntries(query);
  const trimmedQuery = query.trim();
  const metaLabel = (() => {
    if (trimmedQuery === "") {
      return "내용으로 검색합니다";
    }
    if (searchEntries.isLoading) {
      return "";
    }
    if (searchEntries.results.length === 0) {
      return "일치하는 기록이 없습니다";
    }
    return `${searchEntries.results.length}건`;
  })();

  return (
    <ScreenContainer>
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          autoFocus
          returnKeyType="search"
          placeholder="기록 검색"
          placeholderTextColor={theme.colors.faint}
          style={[
            styles.input,
            {
              borderRadius: theme.radius.button,
              borderColor: theme.colors.line,
              backgroundColor: theme.colors.surface,
              color: theme.colors.ink,
            },
          ]}
        />
        <HeaderTextButton label="닫기" onPress={() => router.back()} />
      </View>
      <ThemedText size={13} color="sub" style={styles.meta}>
        {metaLabel}
      </ThemedText>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.results,
          { gap: theme.listGap, paddingBottom: 40 + insets.bottom },
        ]}>
        {searchEntries.results.map((entry) => (
          <SearchResultItem
            key={entry.id}
            entry={entry}
            query={trimmedQuery}
            onPress={() => router.push({ pathname: "/days/[date]", params: { date: entry.date } })}
          />
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontFamily: FONT_FAMILY.sans[400],
    fontSize: 16,
  },
  meta: {
    paddingHorizontal: 22,
    paddingBottom: 8,
  },
  results: {
    paddingHorizontal: 16,
  },
});
