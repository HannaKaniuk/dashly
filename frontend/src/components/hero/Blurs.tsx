import { Asset } from "@/components/ui/Asset";

export function HeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="hero-blur-mobile absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="absolute inset-[-24%_-131%_-42%_-52%]">
            <Asset
              src="/icons/mobile/blur-bg.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
        <div className="absolute left-[-2%] top-0 h-full w-full">
          <div className="absolute inset-[-25%_-51%_-33%_-50%]">
            <Asset
              src="/icons/mobile/blur-grey.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>

      <div className="hero-blur-desktop absolute inset-0">
        <div className="absolute left-0 top-0 h-[78.52%] w-[83%]">
          <div className="absolute inset-[-27%_-17%]">
            <Asset
              src="/icons/blur-ellipse-106.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
        <div className="absolute left-[27.92%] top-[24.04%] flex h-[75.96%] w-[72.08%] items-center justify-center">
          <div className="flex-none rotate-[-178deg] skew-x-[-2deg]">
            <div className="relative h-[72%] w-[95%]">
              <div className="absolute inset-[-30%_-20%]">
                <Asset
                  src="/icons/blur-ellipse-107.svg"
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[41.94%] top-[55.77%] h-[40.49%] w-[30.07%]">
          <div className="absolute inset-[-79%_-69%]">
            <Asset
              src="/icons/blur-ellipse-120.svg"
              className="block size-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
