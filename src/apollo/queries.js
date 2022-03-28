import gql from 'graphql-tag';

export const PAGE_ITEMS = 1000;

export const STAKE_POSITION = gql`
    query snapshots($skip: Int!, $pool: Int!, $balanceThreshold: Int!) {
      stakePositions(first: 1000, skip: $skip, where: {pool: $pool, stakeBalance_gte: $balanceThreshold}, orderBy: stakeBalance, orderDirection: desc) {
        id
        pool
        staker
        stakeBalance
      }
    }
`;