import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  /** @title Texto de login quando o usuario estiver logado */
  userLoggedText: string;
  /** @title Texto de login quando o usuario não estiver logado */
  userNotLoggedText: string;
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo,
  userLoggedText,
  userNotLoggedText,
  user,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header class="h-[89px] lg:h-[95px]">
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              userLoggedText={userLoggedText}
              userNotLoggedText={userNotLoggedText}
              user={user}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  return {
    ...props,
    user: await ctx.invoke.vtex.loaders.user(),
  };
}

export default Header;
