/** @jsxImportSource @emotion/react */
import { FormControl, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { StringList } from '../StringList';
import { PriceList } from '../PriceList'
import { inventory_status } from '../../constants/select'

interface Price {
  measurement: string
  quantity: number
  price: number
}
interface Coffee {
  _id: string
  state: string
  key: string
  decaf: boolean
  prices: Price[]
  mouthfeel: number
  acidity: number
  caramel: number
  fruit: number
  flower: number
  flavors: string[]
  qualities: string[]
  region: string
  roast: string
  paragraphs: string[]
}
interface Props {
  coffee: Coffee
  onChange: (coffee: Coffee) => void;
}
export const CoffeeInput: React.FC<Props> = ({ coffee, onChange }) => {
  const handleParagraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.paragraphs = [event.target.value];
    onChange(newCoffee);
  };
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.key = event.target.value;
    onChange(newCoffee);
  };
  const handleDecafChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.decaf = event.target.checked;
    onChange(newCoffee);
  };
  const handleStateChange = (event: SelectChangeEvent) => {
    const newCoffee = { ...coffee };
    newCoffee.state = event.target.value;
    onChange(newCoffee);
  };
  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.region = event.target.value;
    onChange(newCoffee);
  };
  const handleRoastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.roast = event.target.value;
    onChange(newCoffee);
  };
  const handleMouthfeelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.mouthfeel = parseFloat(event.target.value);
    onChange(newCoffee);
  };
  const handleAcidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.acidity = parseFloat(event.target.value);
    onChange(newCoffee);
  };
  const handleCaramelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.caramel = parseFloat(event.target.value);
    onChange(newCoffee);
  };
  const handleFlowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.flower = parseFloat(event.target.value);
    onChange(newCoffee);
  };
  const handleFruitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffee = { ...coffee };
    newCoffee.fruit = parseFloat(event.target.value);
    onChange(newCoffee);
  };
  const handleFlavorsChange = (flavs: string[]) => {
    const newCoffee = { ...coffee };
    newCoffee.flavors = flavs;
    onChange(newCoffee);
  };
  const handleQualitiesChange = (qual: string[]) => {
    const newCoffee = { ...coffee };
    newCoffee.qualities = qual;
    onChange(newCoffee);
  };
  const handlePriceChange = (prices: Price[]) => {
    const newCoffee = { ...coffee };
    newCoffee.prices = prices;
    onChange(newCoffee);
  };

  const renderStateSelect = () => {
    return (
      <FormControl style={{ width: 140 }}>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={coffee.state}
          label="state"
          onChange={handleStateChange}
        >
          {
            inventory_status.map((item, i) => (<MenuItem key={i} value={item.value}>{item.display}</MenuItem>))
          }

        </Select>
      </FormControl>
    )
  }
  const renderGeneral = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>general</Typography>
        <div css={styles.generalContainer}>
          <FormControlLabel css={styles.decafLabelSwitch} label="Decaf" control={
            <Switch size="small" checked={coffee.decaf} onChange={handleDecafChange} />
          } />
          <TextField label="key" css={styles.generalTextField} value={coffee.key} onChange={handleKeyChange} />
          {renderStateSelect()}
          <TextField label="region" css={styles.generalTextField} value={coffee.region} onChange={handleRegionChange} />
          <TextField label="roast" css={styles.generalTextField} value={coffee.roast} onChange={handleRoastChange} />
        </div>
      </Paper>

    )
  }
  const renderPrices = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <PriceList list={coffee.prices} onChange={handlePriceChange} title="prices" />
      </Paper>
    )
  }
  const renderDescriptions = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>descriptions</Typography>
        <div css={styles.generalContainer}>
          <StringList list={coffee.flavors} onChange={handleFlavorsChange} title="flavors" />
          <StringList list={coffee.qualities} onChange={handleQualitiesChange} title="qualities" />
        </div>
        <TextField label="paragraph"
          multiline
          rows={4}
          css={styles.paragraphTextField}
          value={coffee.paragraphs[0]}
          onChange={handleParagraphChange} />

      </Paper>
    )
  }
  const renderFlavorProfile = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>flavor profile</Typography>
        <div css={styles.flavorProfileContainer}>
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="mouthfeel" value={coffee.mouthfeel} onChange={handleMouthfeelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="acidity" value={coffee.acidity} onChange={handleAcidityChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="caramel" value={coffee.caramel} onChange={handleCaramelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="fruit" value={coffee.fruit} onChange={handleFruitChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="flower" value={coffee.flower} onChange={handleFlowerChange} type='number' />
        </div>
      </Paper>

    )
  }

  return (
    <Paper elevation={16} css={styles.container}>
      {renderGeneral()}
      {renderFlavorProfile()}
      {renderPrices()}
      {renderDescriptions()}
    </Paper>
  );
};
