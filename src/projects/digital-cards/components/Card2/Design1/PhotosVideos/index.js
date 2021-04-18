import { useSelector } from 'react-redux';
import { FileIcon } from 'react-file-icon';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

import { isVideoFromName, isImageFromName } from '../../../../../../utils/files';
import * as constants from '../../constants';
import { getLanguage } from '../../lang';
import TitleSeparator from '../TitleSeparator';

import Video from './Video';

const PhotosVideos = props => {
  const { card } = props;
  const language = getLanguage(useSelector(store => store.language));

  if (!card.photos_or_videos?.length) return <div />;

  return (
    <div className="photosVideos" id="photosVideos">
      <TitleSeparator title={language.photosVideos} color={card.border_color} />
      <div className="photosOrVideos">
        {card.photos_or_videos.map((photoOrVideo, i) => {
          const url = photoOrVideo.photo_or_video;
          const isVideo = isVideoFromName(url);
          const isImage = isImageFromName(url);

          if (isImage) return <img key={i} className="image" src={url} />;
          if (isVideo) return <Video key={i} url={url} />;
          return undefined;
        })}
      </div>
      <style jsx>
        {`
          .line {
            width: 100%;
            height: 3px;
            border-radius: 7px;
          }
          .document {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 7px;
          }
          .icon {
            min-width: 20px;
            max-width: 20px;
          }
          .downloadLink {
            margin-left: 7px;
          }
          .photosOrVideos {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .image {
            width: 100px;
            margin: 14px;
            border-radius: 14px;
          }
        `}
      </style>
    </div>
  );
};

PhotosVideos.propTypes = constants.cardPropTypes;

export default PhotosVideos;
