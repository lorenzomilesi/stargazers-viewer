import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchRepository, fetchStargazers } from '../../api';
import { ListProps, Repository, Stargazer } from './types';

const PER_PAGE = 30;

export const List: React.FC<ListProps> = ({ route, navigation }) => {
  const [isLoadingRepo, setIsLoadingRepo] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [repo, setRepo] = useState<Repository>();
  const [data, setData] = useState<Stargazer[]>([]);
  const [page, setPage] = useState<number>(1);
  const { owner, repository } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `${owner}/${repository}`,
    });
  }, [navigation, owner, repository]);

  const getStargazers = useCallback(async () => {
    if (!repo || repo.stargazers_count > page * PER_PAGE) {
      try {
        const response = await fetchStargazers(owner, repository, page);
        console.log('[debug] response:', response);
        if (Array.isArray(response)) {
          setData([...data, ...response]);
        }
      } catch (error) {
        // TOOD: show error
        console.error(error);
      } finally {
        setIsLoadingList(false);
      }
    }
  }, [owner, repository, page]);

  const getRepo = async () => {
    try {
      const response = await fetchRepository(owner, repository);
      console.log('[debug] repo:', response);
      if (response?.id) {
        setRepo(response);
      }
    } catch (error) {
      // TOOD: show error
      console.error(error);
    } finally {
      setIsLoadingRepo(false);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);

  useEffect(() => {
    getStargazers();
  }, [page]);

  const renderItem = ({ item }: { item: Stargazer }) => {
    return (
      <View
        style={{
          padding: 16,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <Image
          source={{ uri: item.avatar_url }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          loadingIndicatorSource={require('../../../assets/gh_logo.png')}
        />
        <Text>{item.login}</Text>
      </View>
    );
  };

  console.log('[debug] data:', data);

  return (
    <View style={styles.container}>
      {isLoadingList || isLoadingRepo ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          {(repo?.stargazers_count || repo?.description) && (
            <View
              style={{
                margin: 16,
                borderRadius: 10,
                padding: 16,
                alignContent: 'center',
                backgroundColor: '#00A1B0',
              }}>
              {repo?.stargazers_count && (
                <Text
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  {repo?.stargazers_count} stargazers
                </Text>
              )}
              {repo?.description && (
                <Text
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                    color: 'white',
                  }}>
                  {repo.description}
                </Text>
              )}
            </View>
          )}
          <FlatList
            style={{ width: '100%' }}
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={{ width: '100%', textAlign: 'center' }}>
                {repo && !repo?.stargazers_count
                  ? 'No stargazers for the current repo'
                  : 'Repository not found'}
              </Text>
            }
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
          />
        </>
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
    backgroundColor: '#CCECEF',
  },
});
