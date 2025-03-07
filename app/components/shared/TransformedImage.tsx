import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  isTransforming,
  setIsTransforming,
  transformationConfig,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = () => {};
  return (
    <div className="flex flex-col gap-4">
      <div className="flex-betwwen">
        <h3 className="h3-bold text-dark-600">Transformed</h3>

        {hasDownload && (
          <button className="download-btn" onClick={downloadHandler}>
            <Image
              src="/assets/icons/download.svg"
              alt="Download Icon"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className=" relative">
          <CldImage
            src={image?.publicId}
            alt={image?.title}
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000);
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image
                src="/assets/icons/spinner.svg"
                alt="Transforming"
                height={50}
                width={50}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="transformed-placeholder">Transformed Image</div>
      )}
    </div>
  );
};

export default TransformedImage;
