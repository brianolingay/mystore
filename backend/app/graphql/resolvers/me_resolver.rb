module Resolvers
  class MeResolver < Resolvers::BaseResolver
    type Types::UserType, null: false

    def resolve
      context[:current_resource]
    end
  end
end
