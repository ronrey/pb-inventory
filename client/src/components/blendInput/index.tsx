/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Paper, TextField, Typography } from "@mui/material";
import { styles } from "./styles";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { StringList } from '../StringList';
import { PriceList } from '../PriceList'


interface Price {
  measurement: string
  quantity: number
  price: number
}
interface Blend {
  _id: string
  name: string
  state: string
  decaf: boolean
  prices: Price[]
  coffees: string[]
  mouthfeel: number
  acidity: number
  caramel: number
  fruit: number
  flower: number
  flavors: string[]
  qualities: string[]
  paragraphs: string[]
}
interface Props {
  blend: Blend
  onChange: (blend: Blend) => void;
}
export const BlendInput: React.FC<Props> = ({ blend, onChange }) => {
  const handleParagraphChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.paragraphs = [event.target.value];
    onChange(newBlend);
  };
  const handleDecafChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.decaf = event.target.checked;
    onChange(newBlend);
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.state = event.target.value;
    onChange(newBlend);
  };

  const handleMouthfeelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.mouthfeel = parseFloat(event.target.value);
    onChange(newBlend);
  };
  const handleAcidityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.acidity = parseFloat(event.target.value);
    onChange(newBlend);
  };
  const handleCaramelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.caramel = parseFloat(event.target.value);
    onChange(newBlend);
  };
  const handleFlowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.flower = parseFloat(event.target.value);
    onChange(newBlend);
  };
  const handleFruitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBlend = { ...blend };
    newBlend.fruit = parseFloat(event.target.value);
    onChange(newBlend);
  };
  const handleFlavorsChange = (flavs: string[]) => {
    const newBlend = { ...blend };
    newBlend.flavors = flavs;
    onChange(newBlend);
  };
  const handleQualitiesChange = (qual: string[]) => {
    const newBlend = { ...blend };
    newBlend.qualities = qual;
    onChange(newBlend);
  };
  const handlePriceChange = (prices: Price[]) => {
    const newBlend = { ...blend };
    newBlend.prices = prices;
    onChange(newBlend);
  };

  const renderGeneral = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>general</Typography>
        <div css={styles.generalContainer}>
          <FormControlLabel css={styles.decafLabelSwitch} label="Decaf" control={
            <Switch size="small" checked={blend.decaf} onChange={handleDecafChange} />
          } />
          <TextField label="state" css={styles.generalTextField} value={blend.state} onChange={handleStateChange} />
        </div>
      </Paper>

    )
  }
  const renderPrices = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <PriceList list={blend.prices} onChange={handlePriceChange} title="prices" />
      </Paper>
    )
  }
  const renderDescriptions = () => {
    return (
      <Paper css={styles.paper} elevation={4} >
        <Typography variant="h6" css={styles.sectionLabel}>descriptions</Typography>
        <div css={styles.generalContainer}>
          <StringList list={blend.flavors} onChange={handleFlavorsChange} title="flavors" />
          <StringList list={blend.qualities} onChange={handleQualitiesChange} title="qualities" />
        </div>
        <TextField label="paragraph"
          multiline
          rows={4}
          css={styles.paragraphTextField}
          value={blend.paragraphs[0]}
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

          }} label="mouthfeel" value={blend.mouthfeel} onChange={handleMouthfeelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="acidity" value={blend.acidity} onChange={handleAcidityChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="caramel" value={blend.caramel} onChange={handleCaramelChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="fruit" value={blend.fruit} onChange={handleFruitChange} type='number' />
          <TextField css={styles.flavorProfile} variant='outlined' inputProps={{
            min: .10,
            step: .10,
            max: 1.0,

          }} label="flower" value={blend.flower} onChange={handleFlowerChange} type='number' />
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
