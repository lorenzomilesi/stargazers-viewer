import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card } from '../../components/Card';
import { COLORS } from '../../values/colors';
import { useStargazerList } from './hooks';
import { ListProps, Stargazer } from './types';

/**
 * Renders the list screen of the app.
 * It contains a list of stargazers for a GitHub repository.
 * @param route - The route prop used to get the owner and repository params.
 * @param navigation - The navigation prop used to navigate between screens.
 * @returns The list screen component.
 */

export const List: React.FC<ListProps> = ({ route, navigation }) => {
  const [page, setPage] = useState<number>(1);
  const { owner, repository } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `${owner}/${repository}`,
    });
  }, [navigation, owner, repository]);

  const { data, isLoadingRepo, isLoadingList, repo, repoError, listError } =
    useStargazerList({
      owner,
      repository,
      page,
    });

  // Component to render each item of the list
  const renderItem = ({ item }: { item: Stargazer }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.avatar_url }}
          style={styles.itemImage}
          loadingIndicatorSource={require('../../../assets/gh_logo.png')}
        />
        <Text>{item.login}</Text>
      </View>
    );
  };

  // Component to be rendered when the list is empty
  const ListEmptyComponent = () => (
    <View style={styles.listEmptyComponentContainer}>
      <FontAwesome name="inbox" size={64} color={COLORS.DARK_GRAY} />
      <Text>
        {repo && !repo?.stargazers_count
          ? 'No stargazers for the current repo'
          : listError || 'Repository not found'}
      </Text>
    </View>
  );

  // Component to be rendered between each item of the list
  const ItemSeparatorComponent = () => (
    <View style={styles.separator} />
  );

  // Function to extract the key from the item
  const keyExtractor = (item: Stargazer) => item.id.toString();

  // In order to optimize the performance of the FlatList
  // item height + separator height = 61
  const getItemLayout = (
    _data: ArrayLike<Stargazer> | null | undefined,
    index: number,
  ) => ({ length: 61, offset: 61 * index, index });

  return (
    <View style={styles.container}>
      {isLoadingRepo || (isLoadingList && page === 1) ? (
        <ActivityIndicator size="large" testID="loading-indicator" />
      ) : (
        <View style={styles.content}>
          {(repo?.stargazers_count || repo?.description || !!repoError) && (
            <>
              <Card>
                {!!repo?.stargazers_count && (
                  <Text style={styles.cardText}>
                    {repo?.stargazers_count?.toLocaleString()} stargazers
                  </Text>
                )}
                {!!repo?.description && (
                  <Text style={styles.cardText}>{repo.description}</Text>
                )}
                {!!repoError && (
                  <Text style={[styles.cardText, { color: COLORS.RED }]}>
                    {repoError}
                  </Text>
                )}
              </Card>
              <View style={[styles.separator, styles.divider]} />
            </>
          )}
          <FlatList
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<ListEmptyComponent />}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            getItemLayout={getItemLayout}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
          <View style={styles.loadMore}>
            {isLoadingList && <ActivityIndicator size="small" />}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  content: {
    width: '100%',
    flex: 1,
    padding: 16,
  },
  cardText: {
    width: '100%',
    alignSelf: 'center',
  },
  itemContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  loadMore: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginTop: 16,
    marginBottom: 0,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
  }
});
