import { Dimensions } from 'react-native';

export const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
  
// Use iPhone13 as base size which is 390 x 844
const baseWidth = 390;
const baseHeight = 844;

const scaleWidth = dimensions.width / baseWidth;
const scaleHeight = dimensions.height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: number) => Math.ceil((size * scale));

export const containerSizes = {
  halfHeight: dimensions.height / 2
};

export const colors = {
    primaryBlue: '#3772FF',
    primaryBlueVariant: '#2956BF',
    primaryPurple: '#9757D7',
    primaryRed: '#EF466F',
    primaryGreen: '#45B26B',

    secondaryBlue: '#4BC9F0',
    secondaryGray: '#E4D7CF',
    secondaryYellow: '#FFD166',
    secondaryPurple: '#CDB4DB',

    neutralOne: '#141416', // dark black
    neutralTwo: '#23262F', // medium black
    neutralThree: '#353945', // light black
    neutralFour: '#777E90', // dark gray
    neutralFive: '#B1B5C3', // medium gray
    neutralSix: '#E6E8EC', // light gray
    neutralSeven: '#F4F5F6', // very light gray
    neutralEight: '#FCFCFD', // white
};

//TODO: should add in react natives pixel ratio here, it shows what setting the user has for font sizes, look at docs

export const fonts = { //most of these will never get use I'm just doing this to keep parity with our design system
    hero: {
        fontFamily: 'DMSans_700Bold',      
        fontSize: scaledSize(96),
        lineHeight: scaledSize(96),
    },
    headlineOne: {
        fontFamily: 'DMSans_700Bold',
        fontSize: scaledSize(64),
        lineHeight: scaledSize(64),
    },
    headlineTwo: {
        fontFamily: 'DMSans_700Bold',
        fontSize: scaledSize(56),
        lineHeight: scaledSize(56),
    },
    headlineThree: {
        fontFamily: 'DMSans_700Bold',
        fontSize: scaledSize(48),
        lineHeight: scaledSize(48),
    },
    headlineFour: {
        fontFamily: 'DMSans_700Bold',
        fontSize: scaledSize(40),
        lineHeight: scaledSize(40),
    },
    bodyOne: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scaledSize(24),
        lineHeight: scaledSize(32)
    },
    bodyOneBold: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: scaledSize(24),
        lineHeight: scaledSize(32)
    },
    bodyTwo: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scaledSize(16), 
        lineHeight: scaledSize(24)
    },
    bodyTwoBold: {
        fontFamily: 'Poppins_500Medium',
        fontSize: scaledSize(16),
        lineHeight: scaledSize(24)
    },
    captionOne: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scaledSize(14),
        lineHeight: scaledSize(24)
    },
    captionOneBold: {
        fontFamily: 'Poppins_500Medium',
        fontSize: scaledSize(14),
        lineHeight: scaledSize(24)
    },
    captionTwo: {
        fontFamily: 'Poppins_400Regular',
        fontSize: scaledSize(12),
        lineHeight: scaledSize(20)
    },
    captionTwoBold: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: scaledSize(12),
        lineHeight: scaledSize(20)
    },
    hairlineOne: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scaledSize(16),
        lineHeight: scaledSize(16)
    },
    hairlineTwo: {
        fontFamily: 'Poppins_700Bold',
        fontSize: scaledSize(12),
        lineHeight: scaledSize(12)
    },
    buttonOne: {
      fontFamily: 'DMSans_700Bold',
      fontSize: scaledSize(16),
      lineHeight: scaledSize(16),
    },
    buttonTwo: {
      fontFamily: 'DMSans_700Bold',
      fontSize: scaledSize(14),
      lineHeight: scaledSize(16),
    }
};

