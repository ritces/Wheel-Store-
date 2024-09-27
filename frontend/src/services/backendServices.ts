import { axiosManager } from './axiosManager';

//*** Products ***//

export const createProduct = async (data: any) => {
  const res = await axiosManager.fileInstance.post(`/products`, data);
  return res.data;
};

export const getProducts = async () => {
  const res = await axiosManager.GET(`/products`);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axiosManager.GET(`/products/${id}`);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axiosManager.DELETE(`/products/${id}`);
  return res.data;
};

//*** Parts ***//

export const createProductPart = async (data: any) => {
  const res = await axiosManager.POST(`/product-parts`, data);
  return res.data;
};

export const getProductParts = async () => {
  const res = await axiosManager.GET(`/product-parts`);
  return res.data;
};

export const getPartById = async (productId: number) => {
  const res = await axiosManager.GET(`/product-parts/${productId}`);
  return res.data;
};

export const deleteProductPart = async (id: number) => {
  const res = await axiosManager.DELETE(`/product-parts/${id}`);
  return res.data;
};

//*** Parts Options ***//

export const createProductPartOption = async (data: any) => {
  const res = await axiosManager.POST(`/product-parts/options`, data);
  return res.data;
};

export const getProductPartsOptions = async () => {
  const res = await axiosManager.GET(`/product-parts/options`);
  return res.data;
};

export const getPartOptionById = async (id: number) => {
  const res = await axiosManager.GET(`/product-parts/options/${id}`);
  return res.data;
};

export const deleteProductPartOption = async (id: number) => {
  const res = await axiosManager.DELETE(`/product-parts/options/${id}`);
  return res.data;
};

//*** Product Pricing Rules ***//

export const createProductPricingRule = async (data: any) => {
  const res = await axiosManager.POST(`/pricing-rules`, data);
  return res.data;
};

export const getProductPricingRules = async () => {
  const res = await axiosManager.GET(`/pricing-rules`);
  return res.data;
};

export const deleteProductPricingRule = async (id: number) => {
  const res = await axiosManager.DELETE(`/pricing-rules/${id}`);
  return res.data;
};

export const assignPricingRuleToPartOption = async (
  partOptionId: number,
  pricingRuleId: number,
) => {
  const res = await axiosManager.POST(
    `/product-parts/options/${partOptionId}/pricing-rules/${pricingRuleId}`,
  );
  return res.data;
};

export const unassignPricingRuleFromPartOption = async (
  partOptionId: number,
  pricingRuleId: number,
) => {
  const res = await axiosManager.DELETE(
    `/product-parts/options/${partOptionId}/pricing-rules/${pricingRuleId}`,
  );
  return res.data;
};

export const getProductPricingRulesByPartOptionId = async (
  partOptionId: number,
) => {
  const res = await axiosManager.GET(
    `/product-parts/options/${partOptionId}/pricing-rules`,
  );
  return res.data;
};

//*** Product Restriction Rules ***//

export const createProductRestrictionRule = async (data: any) => {
  const res = await axiosManager.POST(`/restriction-rules`, data);
  return res.data;
};

export const getProductRestrictionRules = async () => {
  const res = await axiosManager.GET(`/restriction-rules`);
  return res.data;
};

export const deleteProductRestrictionRule = async (id: number) => {
  const res = await axiosManager.DELETE(`/restriction-rules/${id}`);
  return res.data;
};

export const assignRestrictionRuleToPartOption = async (
  partOptionId: number,
  restrictionRuleId: number,
) => {
  const res = await axiosManager.POST(
    `/product-parts/options/${partOptionId}/restriction-rules/${restrictionRuleId}`,
  );
  return res.data;
};

export const unassignRestrictionRuleFromPartOption = async (
  partOptionId: number,
  restrictionRuleId: number,
) => {
  const res = await axiosManager.DELETE(
    `/product-parts/options/${partOptionId}/restriction-rules/${restrictionRuleId}`,
  );
  return res.data;
};

export const getProductRestrictionRulesByPartOptionId = async (
  partOptionId: number,
) => {
  const res = await axiosManager.GET(
    `/product-parts/options/${partOptionId}/restriction-rules`,
  );
  return res.data;
};

//*** Product Pricing Conditions ***//

export const getPricingConditions = async () => {
  const res = await axiosManager.GET(`/pricing-rules/conditions`);
  return res.data;
};

//*** Product Restriction Conditions ***//

export const getRestrictionConditions = async () => {
  const res = await axiosManager.GET(`/restriction-rules/conditions`);
  return res.data;
};

export const createCheckoutSession = async (data: any) => {
  const res = await axiosManager.POST(`/stripe/create-checkout-session`, data);
  return res.data;
};

export const getCheckoutSession = async (sessionId: string) => {
  const res = await axiosManager.GET(`/stripe/checkout-session/${sessionId}`);
  return res.data;
};
