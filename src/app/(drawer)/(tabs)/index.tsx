import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { ProductGrid } from '@/components/catalog/ProductGrid';
import { Chip } from '@/components/ui/Chip';
import { Screen } from '@/components/ui/Screen';
import { SearchField } from '@/components/ui/SearchField';
import { StateMessage } from '@/components/ui/StateMessage';
import { useProducts } from '@/features/catalog/hooks/useProducts';
import { useCatalogFilter, type CatalogFilter } from '@/features/catalog/useCatalogFilter';
import { colors } from '@/theme/colors';

interface CatalogHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  filter: CatalogFilter;
  onFilterChange: (filter: CatalogFilter) => void;
  resultCount: number;
}

function CatalogHeader({ query, onQueryChange, filter, onFilterChange, resultCount }: CatalogHeaderProps) {
  const { t } = useTranslation();
  const filters: { value: CatalogFilter; label: string }[] = [
    { value: 'all', label: t('catalog.filterAll') },
    { value: 'earrings', label: t('catalog.filterEarrings') },
    { value: 'bracelet', label: t('catalog.filterBracelets') },
  ];

  return (
    <View className="gap-3 pb-2 pt-2">
      <Text className="font-sans-medium text-xs uppercase tracking-[3px] text-or">{t('catalog.eyebrow')}</Text>
      <Text className="font-serif text-4xl leading-[42px] text-encre">{t('catalog.title')}</Text>
      <Text className="font-sans-light text-base leading-6 text-taupe">{t('catalog.intro')}</Text>
      <View className="mt-4">
        <SearchField
          value={query}
          onChangeText={onQueryChange}
          placeholder={t('catalog.searchPlaceholder')}
          clearLabel={t('catalog.clearSearch')}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 py-2">
        {filters.map((item) => (
          <Chip
            key={item.value}
            label={item.label}
            selected={filter === item.value}
            onPress={() => onFilterChange(item.value)}
          />
        ))}
      </ScrollView>
      <Text className="font-sans text-xs text-taupe-clair">{t('catalog.resultCount', { count: resultCount })}</Text>
    </View>
  );
}

export default function CatalogScreen() {
  const { t } = useTranslation();
  const { data = [], isPending, isError, refetch, isRefetching } = useProducts();
  const { query, setQuery, filter, setFilter, visible, reset } = useCatalogFilter(data);

  if (isPending) {
    return (
      <Screen className="items-center justify-center gap-3">
        <ActivityIndicator color={colors.or} />
        <Text className="font-sans-light text-sm text-taupe">{t('catalog.loading')}</Text>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen>
        <StateMessage
          icon="cloud-offline-outline"
          title={t('catalog.errorTitle')}
          description={t('catalog.errorBody')}
          action={{ label: t('catalog.retry'), onPress: () => refetch() }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <ProductGrid
        products={visible}
        header={
          <CatalogHeader
            query={query}
            onQueryChange={setQuery}
            filter={filter}
            onFilterChange={setFilter}
            resultCount={visible.length}
          />
        }
        empty={
          <View className="pt-6">
            <StateMessage
              icon="search-outline"
              title={t('catalog.noResultsTitle')}
              description={t('catalog.noResultsBody')}
              action={{ label: isRefetching ? t('catalog.loading') : t('catalog.resetFilters'), onPress: reset }}
            />
          </View>
        }
      />
    </Screen>
  );
}
