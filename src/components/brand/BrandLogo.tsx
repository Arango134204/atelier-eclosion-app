import { Image } from 'expo-image';

const LOGO_ASPECT_RATIO = 720 / 610;

interface BrandLogoProps {
  /** Alto en puntos; el ancho se calcula para no deformar el logo. */
  height: number;
}

/** Logo oficial de Atelier Éclosion (tomado de ateliereclosionbijoux.com). */
export function BrandLogo({ height }: BrandLogoProps) {
  return (
    <Image
      source={require('@/assets/brand/logo.png')}
      style={{ height, width: height * LOGO_ASPECT_RATIO }}
      contentFit="contain"
      accessibilityLabel="Atelier Éclosion Bijoux"
    />
  );
}
