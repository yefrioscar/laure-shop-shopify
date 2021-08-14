import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'
import { ProductEdge } from '../schema'
import { Product } from '@commerce/types'
import getCollectionQuery from '../utils/queries/get-collections-query'
import getCollectionProductsQuery from '../utils/queries/get-collection-products-query'

type Variables = {
  categoryId: string
  first: number
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
    getCollectionProductsQuery,
    {
      variables,
    }
  )

  console.log('====================================')
  console.log(data)
  console.log('====================================')

  // const products =
  //   data.products?.edges?.map(({ node: p }: ProductEdge) =>
  //     normalizeProduct(p)
  //   ) ?? []

  return {
    data,
  }
}

export default getCollectionProducts
