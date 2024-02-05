import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {Segment} from './Segment';

export const MyComposition: React.FC = () => {
	return (
		<AbsoluteFill className="bg-gray-600 items-center justify-center">
			<Audio src={staticFile('audio.wav')} />
			<Segment />
		</AbsoluteFill>
	);
};
