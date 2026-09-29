import { Asset } from "@/components/ui/Asset";

export function HeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute left-0 top-0 h-[735px] w-[1195px]">
        <div className="absolute inset-[-27%_-17%]">
          <Asset
            src="/icons/blur-ellipse-106.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-[401.98px] top-[225px] flex h-[711px] w-[1038px] items-center justify-center">
        <div className="flex-none rotate-[-178deg] skew-x-[-2deg]">
          <div className="relative h-[674px] w-[989px]">
            <div className="absolute inset-[-30%_-20%]">
              <Asset
                src="/icons/blur-ellipse-107.svg"
                className="block size-full max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[604px] top-[522px] h-[379px] w-[433px]">
        <div className="absolute inset-[-79%_-69%]">
          <Asset
            src="/icons/blur-ellipse-120.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

export function MobileHeroBlurs() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="absolute left-[0.5px] top-0 h-[840px] w-[388px]">
        <div className="absolute inset-[-24%_-131%_-42%_-52%]">
          <Asset
            src="/icons/mobile/blur-bg.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
      <div className="absolute left-[-8px] top-0 h-[812.198px] w-[396px]">
        <div className="absolute inset-[-25%_-51%_-33%_-50%]">
          <Asset
            src="/icons/mobile/blur-grey.svg"
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
