{
  "log": {
    "disabled": false,
    "level": "info",
    "timestamp": true
  },
  "dns": {
    "servers": [
      {
        "tag": "cloudflare",
        "type": "https",
        "server": "1.1.1.1",
        "detour": "PROXY"
      },
      {
        "tag": "ali",
        "type": "https",
        "server": "223.5.5.5"
      },
      {
        "tag": "fakeip",
        "type": "fakeip",
        "inet4_range": "198.18.0.0/15",
        "inet6_range": "fc00::/18"
      }
    ],
    "rules": [
      {
        "clash_mode": "Direct",
        "action": "route",
        "server": "ali"
      },
      {
        "clash_mode": "Global",
        "action": "route",
        "server": "fakeip"
      },
      {
        "rule_set": "ads_domain",
        "action": "reject"
      },
      {
        "query_type": "HTTPS",
        "action": "reject"
      },
      {
        "query_type": [
          "A",
          "AAAA"
        ],
        "action": "route",
        "server": "fakeip",
        "rewrite_ttl": 1
      },
      {
        "rule_set": "cn_domain",
        "action": "route",
        "server": "ali"
      }
    ],
    "final": "cloudflare",
    "independent_cache": true
  },
  "route": {
    "default_domain_resolver": {
      "server": "ali"
    },
    "rules": [
      {
        "action": "sniff",
        "sniffer": [
          "http",
          "tls",
          "quic",
          "dns"
        ],
        "timeout": "500ms"
      },
      {
        "type": "logical",
        "mode": "or",
        "rules": [
          {
            "port": 53
          },
          {
            "protocol": "dns"
          }
        ],
        "action": "hijack-dns"
      },
      {
        "ip_is_private": true,
        "action": "route",
        "outbound": "Direct"
      },
      {
        "clash_mode": "Global",
        "action": "route",
        "outbound": "GLOBAL"
      },
      {
        "clash_mode": "Direct",
        "action": "route",
        "outbound": "Direct"
      },
      {
        "rule_set": "ads_domain",
        "action": "route",
        "outbound": "Ads-Block"
      },
      {
        "rule_set": "bilibili_domain",
        "action": "route",
        "outbound": "BiliBili"
      },
      {
        "rule_set": "youtube_domain",
        "action": "route",
        "outbound": "YouTube"
      },
      {
        "rule_set": "openai_domain",
        "action": "route",
        "outbound": "Only-Ai"
      },
      {
        "type": "logical",
        "mode": "and",
        "rules": [
          {
            "rule_set": "proxy_domain"
          },
          {
            "invert": true,
            "rule_set": [
              "cn_domain",
              "google_domain",
              "telegram_domain"
            ]
          }
        ],
        "action": "route",
        "outbound": "PROXY"
      },
      {
        "action": "resolve"
      },
      {
        "rule_set": [
          "telegram_ip",
          "telegram_domain"
        ],
        "action": "route",
        "outbound": "Telegram"
      },
      {
        "rule_set": [
          "google_ip",
          "google_domain"
        ],
        "action": "route",
        "outbound": "Google"
      },
      {
        "rule_set": [
          "cn_ip",
          "cn_domain"
        ],
        "action": "route",
        "outbound": "CN"
      }
    ],
    "rule_set": [
      {
        "tag": "ads_domain",
        "type": "remote",
        "format": "source",
        "url": "https://github.boki.moe/https://raw.githubusercontent.com/TG-Twilight/AWAvenue-Ads-Rule/main/Filters/AWAvenue-Ads-Rule-Singbox.json",
        "download_detour": "Direct"
      },
      {
        "tag": "bilibili_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/bilibili.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "cn_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geoip/cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "cn_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "google_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/google.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "google_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/google.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "openai_domain",
        "type": "remote",
        "format": "source",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/mashanghai88/xiaohai/main/rules/singbox-ai.json",
        "download_detour": "Direct"
      },
      {
        "tag": "proxy_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo/geosite/geolocation-!cn.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "telegram_ip",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geoip/telegram.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "telegram_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/telegram.srs",
        "download_detour": "Direct"
      },
      {
        "tag": "youtube_domain",
        "type": "remote",
        "format": "binary",
        "url": "https://ghfast.top/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/sing/geo-lite/geosite/youtube.srs",
        "download_detour": "Direct"
      }
    ],
    "final": "Final",
    "auto_detect_interface": true
  },
  "outbounds": [
    {
      "tag": "PROXY",
      "type": "selector",
      "outbounds": [
        "All-Auto",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "US-Link",
        "All-Link",
        "Direct"
      ],
      "default": "All-Auto"
    },
    {
      "tag": "Google",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK-Auto",
        "TW-Auto",
        "JP-Auto",
        "SG-Auto",
        "US-Auto",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "Telegram",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK-Auto",
        "TW-Auto",
        "JP-Auto",
        "SG-Auto",
        "US-Auto",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "BiliBili",
      "type": "selector",
      "outbounds": [
        "Direct",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "US-Link",
        "All-Link"
      ],
      "default": "Direct"
    },
    {
      "tag": "YouTube",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "HK-Auto",
        "TW-Auto",
        "JP-Auto",
        "SG-Auto",
        "US-Auto",
        "All-Auto",
        "Direct"
      ],
      "default": "PROXY"
    },
    {
      "tag": "Only-Ai",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "US-Link",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "All-Link"
      ],
      "default": "US-Auto"
    },
    {
      "tag": "CN",
      "type": "selector",
      "outbounds": [
        "Direct",
        "PROXY",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "US-Link",
        "All-Link"
      ],
      "default": "Direct"
    },
    {
      "tag": "Ads-Block",
      "type": "block"
    },
    {
      "tag": "Final",
      "type": "selector",
      "outbounds": [
        "PROXY",
        "Direct",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "US-Link",
        "All-Link"
      ],
      "default": "PROXY"
    },
    {
      "tag": "HK-Link",
      "type": "selector",
      "outbounds": ["HK-Auto"]
    },
    {
      "tag": "TW-Link",
      "type": "selector",
      "outbounds": ["TW-Auto"]
    },
    {
      "tag": "JP-Link",
      "type": "selector",
      "outbounds": ["JP-Auto"]
    },
    {
      "tag": "SG-Link",
      "type": "selector",
      "outbounds": ["SG-Auto"]
    },
    {
      "tag": "US-Link",
      "type": "selector",
      "outbounds": ["US-Auto"]
    },
    {
      "tag": "All-Link",
      "type": "selector",
      "outbounds": ["All-Auto"]
    },
    {
      "tag": "HK-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "TW-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "JP-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "SG-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "US-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "All-Auto",
      "type": "urltest",
      "outbounds": [],
      "url": "http://www.gstatic.com/generate_204",
      "interval": "1m",
      "tolerance": 50
    },
    {
      "tag": "GLOBAL",
      "type": "selector",
      "outbounds": [
        "Direct",
        "PROXY",
        "HK-Link",
        "TW-Link",
        "JP-Link",
        "SG-Link",
        "US-Link",
        "All-Link"
      ],
      "default": "Direct"
    },
    {
      "tag": "Direct",
      "type": "direct"
    }
  ],
  "inbounds": [
    {
      "type": "tun",
      "address": [
        "172.19.0.0/30",
        "fdfe:dcba:9876::0/126"
      ],
      "stack": "gvisor",
      "auto_route": true,
      "platform": {
        "http_proxy": {
          "enabled": true,
          "server": "127.0.0.1",
          "server_port": 7890
        }
      }
    },
    {
      "type": "mixed",
      "listen": "127.0.0.1",
      "listen_port": 7890
    }
  ],
  "experimental": {
    "clash_api": {
      "external_controller": "127.0.0.1:9090",
      "external_ui": "ui",
      "external_ui_download_url": "https://ghfast.top/https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip",
      "external_ui_download_detour": "Direct"
    },
    "cache_file": {
      "enabled": true,
      "store_fakeip": true
    }
  }
}