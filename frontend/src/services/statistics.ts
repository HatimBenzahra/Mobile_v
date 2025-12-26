import { gql } from '@apollo/client';
import { apolloClient } from './apollo';

const GET_MY_STATISTICS = gql`
  query GetStatistics($commercialId: Int) {
    statistics(commercialId: $commercialId) {
      id
      contratsSignes
      refus
      nbPortesProspectes
      nbImmeublesProspectes
      rendezVousPris
    }
  }
`;

export interface UserStats {
  contratsSignes: number;
  refus: number;
  portesToquees: number;
  immeublesProspectes: number;
  rendezVousPris: number;
}

interface StatisticData {
  id: number;
  contratsSignes: number;
  refus: number;
  nbPortesProspectes: number;
  nbImmeublesProspectes: number;
  rendezVousPris: number;
}

interface StatisticsResponse {
  statistics: StatisticData[];
}

export const statisticsService = {
  async getMyStats(userId: number): Promise<UserStats> {
    try {
      const { data } = await apolloClient.query<StatisticsResponse>({
        query: GET_MY_STATISTICS,
        variables: { commercialId: userId },
        fetchPolicy: 'network-only',
      });

      if (!data?.statistics) {
        throw new Error('No statistics data');
      }

      // Agréger toutes les stats
      const stats = data.statistics.reduce(
        (acc, stat) => ({
          contratsSignes: acc.contratsSignes + stat.contratsSignes,
          refus: acc.refus + stat.refus,
          portesToquees: acc.portesToquees + stat.nbPortesProspectes,
          immeublesProspectes: acc.immeublesProspectes + stat.nbImmeublesProspectes,
          rendezVousPris: acc.rendezVousPris + stat.rendezVousPris,
        }),
        {
          contratsSignes: 0,
          refus: 0,
          portesToquees: 0,
          immeublesProspectes: 0,
          rendezVousPris: 0,
        }
      );

      return stats;
    } catch (error) {
      console.error('Erreur récupération stats:', error);
      return {
        contratsSignes: 0,
        refus: 0,
        portesToquees: 0,
        immeublesProspectes: 0,
        rendezVousPris: 0,
      };
    }
  },
};
