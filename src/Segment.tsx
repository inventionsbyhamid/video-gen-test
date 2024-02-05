import React from 'react';
import {useCurrentFrame} from 'remotion';
import script from '../public/transcribed_output.json';
import {config} from './modules/config';

export const Segment: React.FC = () => {
	const frame = useCurrentFrame();
	const currentTime = frame / config.FPS;

	const currentSegment = script.segments.find((segment: any) => {
		return segment.start <= currentTime && segment.end >= currentTime;
	});

	const words = currentSegment?.words || [];
	const lines = [];
	let line: any[] = [];
	let lineLength = 0;
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		if (lineLength + word.text.length > 30) {
			lines.push(line);
			line = [word];
			lineLength = word.text.length;
		} else {
			line.push(word);
			lineLength += word.text.length;
		}
	}
	lines.push(line);

	const lineToRender = lines.filter((line) => {
		if (line.length === 0) return false;
		const firstWord = line[0];
		const lastWord = line[line.length - 1];
		if (firstWord.start > currentTime) {
			return false;
		}
		if (lastWord.end < currentTime) {
			return false;
		}
		return true;
	});

	return (
		<div className="text-3xl text-center px-14 absolute bottom-80">
			{lineToRender[0]?.map((word, index) => {
				return (
						<span key={index} className={`p-2 tracking-tighter font-luckiest text-8xl ${currentTime >= word.start && currentTime <= word.end ? "text-yellow-300 text-stroke-red bg-green-400": "text-white text-stroke-black"}`}>{word.text} </span>
				);
			})}
		</div>
	);
};
