import { Card, Text } from 'react-native-paper';
import { styles } from './style';


interface CarteStatProps {
  titre: string;
  valeur: number;
  couleur: string;
}

export function CarteStat({ titre, valeur, couleur }: CarteStatProps) {
  return (
    <Card mode="contained" style={styles.carteStat}>
      <Card.Content style={styles.carteStatContenu}>
        <Text
          variant="headlineMedium"
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[styles.statValeur, { color: couleur }]}
        >
          {valeur}
        </Text>

        <Text
          variant="bodySmall"
          numberOfLines={2}
          style={styles.statLabel}
        >
          {titre}
        </Text>
      </Card.Content>
    </Card>
  );
}
