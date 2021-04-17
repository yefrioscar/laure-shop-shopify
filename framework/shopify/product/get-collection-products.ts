import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'
import { ProductEdge } from '../schema'
import { Product } from '@commerce/types'
import getCollectionQuery from '../utils/queries/get-collections-query'

type Variables = {
  id: string
}

type ReturnType = {
  products: Product[]
}

const getCollectionProducts = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getCollectionQuery,
    {
      variables,
    }
  )

  console.log('====================================')
  console.log(data)
  console.log('====================================')

  const products =
    data.products?.edges?.map(({ node: p }: ProductEdge) =>
      normalizeProduct(p)
    ) ?? []

  return {
    products,
  }
}

export default getCollectionProducts
