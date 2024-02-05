import {Composition, staticFile} from 'remotion';
import {MyComposition} from './Composition';
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import './style.css';
import {config} from './modules/config';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="shorts"
				component={MyComposition}
				fps={config.FPS}
				width={1080}
				height={1920}
				calculateMetadata={async () => {
					const durationInSeconds = await getAudioDurationInSeconds(
						staticFile("audio.wav"),
					);
					return {
						durationInFrames: Math.floor(durationInSeconds * config.FPS),
					};
				}}
				defaultProps={{
					titleText: 'Ai Sorts Generator',
					titleColor: '#000000',
					logoColor: '#00bfff',
				}}
			/>
		</>
	);
};
