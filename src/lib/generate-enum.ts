declare function generateEnumSource<K1 extends string>(
  keys: [K1]
): Record<K1, K1>;
declare function generateEnumSource<K1 extends string, K2 extends string>(
  keys: [K1, K2]
): Record<K1, K1> & Record<K2, K2>;
declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string
>(keys: [K1, K2, K3]): Record<K1, K1> & Record<K2, K2> & Record<K3, K3>;
declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(
  keys: [K1, K2, K3, K4]
): Record<K1, K1> & Record<K2, K2> & Record<K3, K3> & Record<K4, K4>;
declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(
  keys: [K1, K2, K3, K4, K5]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string,
  K13 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12> &
  Record<K13, K13>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12> &
  Record<K13, K13> &
  Record<K14, K14>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12> &
  Record<K13, K13> &
  Record<K14, K14> &
  Record<K15, K15>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string
>(
  keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10, K11, K12, K13, K14, K15, K16]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12> &
  Record<K13, K13> &
  Record<K14, K14> &
  Record<K15, K15> &
  Record<K16, K16>;

declare function generateEnumSource<
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  K6 extends string,
  K7 extends string,
  K8 extends string,
  K9 extends string,
  K10 extends string,
  K11 extends string,
  K12 extends string,
  K13 extends string,
  K14 extends string,
  K15 extends string,
  K16 extends string,
  K17 extends string
>(
  keys: [
    K1,
    K2,
    K3,
    K4,
    K5,
    K6,
    K7,
    K8,
    K9,
    K10,
    K11,
    K12,
    K13,
    K14,
    K15,
    K16,
    K17
  ]
): Record<K1, K1> &
  Record<K2, K2> &
  Record<K3, K3> &
  Record<K4, K4> &
  Record<K5, K5> &
  Record<K6, K6> &
  Record<K7, K7> &
  Record<K8, K8> &
  Record<K9, K9> &
  Record<K10, K10> &
  Record<K11, K11> &
  Record<K12, K12> &
  Record<K13, K13> &
  Record<K14, K14> &
  Record<K15, K15> &
  Record<K16, K16> &
  Record<K17, K17>;

const generateEnum: typeof generateEnumSource = (
  keys: string[]
): { [key: string]: string } =>
  keys.reduce(
    (accumulator, current) => ({ ...accumulator, [current]: current }),
    {}
  );

export { generateEnum };
