import type { Schema, Struct } from '@strapi/strapi';

export interface ProductVariationGroup extends Struct.ComponentSchema {
  collectionName: 'components_product_variation_groups';
  info: {
    description: 'Named variation group (e.g. Skin type, Size, Formula)';
    displayName: 'Variation Group';
    icon: 'layer';
  };
  attributes: {
    displayStyle: Schema.Attribute.Enumeration<['pills', 'list']> &
      Schema.Attribute.DefaultTo<'pills'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'product.variation-option', true>;
  };
}

export interface ProductVariationOption extends Struct.ComponentSchema {
  collectionName: 'components_product_variation_options';
  info: {
    description: 'A single option within a variation group';
    displayName: 'Variation Option';
    icon: 'bulletList';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    optionDiscountPercent: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.variation-group': ProductVariationGroup;
      'product.variation-option': ProductVariationOption;
    }
  }
}
