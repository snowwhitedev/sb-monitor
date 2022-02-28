import gql from 'graphql-tag';

export const PAGE_ITEMS = 1000;

export const STAKE_POISITION = gql`
    query snapshots($skip: Int!, $pool: Int!) {
      stakePositions(first: 1000, skip: 0, where: {pool: $pool, stakeBalance_gt: 0}, orderBy: stakeBalance, orderDirection: desc) {
        id
        pool
        staker
        stakeBalance
      }
    }
`;